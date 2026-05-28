import { Alert, Button, Paper, Stack } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { generatePath, useNavigate } from "react-router-dom";
import axios from "axios";

import { createDefaultTeamRole, createEmptyTeamRole } from "../model/defaults";
import {
    createProjectDefaultValues,
    createProjectResolver,
    type CreateProjectFormValues,
} from "../model/createProjectForm";
import type { TeamRole, TeamRoleErrors } from "../model/types";

import CreateProjectBasicsSection from "./CreateProjectBasicsSection";
import CreateProjectTeamSection from "./CreateProjectTeamSection";

import {
    HttpStatuses,
    getProjectsGetProjectsQueryKey,
    normalizeListResponse,
    queryClient,
    useCitiesGetCities,
    useProjectsCreateProject,
    useProjectsCreateProjectVacancy,
    useSkillsGetSkills,
    useTeamRolesGetTeamRoles,
} from "@shared/api";
import type {
    CreateProjectSchema,
    CreateProjectVacancySchema,
} from "@shared/api/generated/model";
import { routePaths } from "@shared/config";
import { time } from "@shared/lib/time";
import { ErrorFallback } from "@shared/ui/ErrorFallback";
import { Loader } from "@shared/ui/Loader";

const CreateProjectPage = () => {
    const navigate = useNavigate();
    const projectForm = useForm<CreateProjectFormValues>({
        resolver: createProjectResolver,
        defaultValues: createProjectDefaultValues,
        mode: "onBlur",
    });
    const [teamRoles, setTeamRoles] = useState<TeamRole[]>([
        createDefaultTeamRole(),
    ]);
    const [roleErrors, setRoleErrors] = useState<
        Record<number, TeamRoleErrors>
    >({});

    const {
        data: citiesResponse,
        isLoading: isCitiesLoading,
        error: citiesError,
        refetch: refetchCities,
    } = useCitiesGetCities(
        { limit: 100 },
        {
            query: {
                staleTime: time.h(1),
            },
        },
    );
    const {
        data: skillsResponse,
        isLoading: isSkillsLoading,
        error: skillsError,
        refetch: refetchSkills,
    } = useSkillsGetSkills(
        { limit: 200 },
        {
            query: {
                staleTime: time.h(1),
            },
        },
    );
    const {
        data: teamRoleOptionsResponse,
        isLoading: isTeamRolesLoading,
        error: teamRolesError,
        refetch: refetchTeamRoles,
    } = useTeamRolesGetTeamRoles(
        { limit: 200 },
        {
            query: {
                staleTime: time.h(1),
            },
        },
    );

    const { mutateAsync: createProject, isPending: isCreatingProject } =
        useProjectsCreateProject();
    const { mutateAsync: createProjectVacancy, isPending: isCreatingVacancy } =
        useProjectsCreateProjectVacancy();

    const isSubmitting = isCreatingProject || isCreatingVacancy;
    const cities = normalizeListResponse(citiesResponse);
    const skills = normalizeListResponse(skillsResponse);
    const teamRoleOptions = normalizeListResponse(teamRoleOptionsResponse);

    const handleAddRole = () => {
        setTeamRoles((currentRoles) => [
            ...currentRoles,
            createEmptyTeamRole(),
        ]);
    };

    const handleRoleChange = (
        roleId: number,
        field: "role" | "description" | "requiredCount",
        value: string | number,
    ) => {
        setTeamRoles((currentRoles) =>
            currentRoles.map((item) =>
                item.id === roleId ? { ...item, [field]: value } : item,
            ),
        );

        setRoleErrors((currentErrors) => {
            const currentRoleErrors = currentErrors[roleId];

            if (!currentRoleErrors) {
                return currentErrors;
            }

            return {
                ...currentErrors,
                [roleId]: {
                    ...currentRoleErrors,
                    ...(field === "role" ? { role: undefined } : {}),
                    ...(field === "requiredCount"
                        ? { requiredCount: undefined }
                        : {}),
                },
            };
        });
    };

    const handleSkillsChange = (roleId: number, skillIds: string[]) => {
        setTeamRoles((currentRoles) =>
            currentRoles.map((item) =>
                item.id === roleId ? { ...item, skillIds } : item,
            ),
        );
    };

    const handleRemoveRole = (roleId: number) => {
        setTeamRoles((currentRoles) =>
            currentRoles.length === 1
                ? currentRoles
                : currentRoles.filter((item) => item.id !== roleId),
        );
        setRoleErrors((currentErrors) => {
            if (!(roleId in currentErrors)) {
                return currentErrors;
            }

            const nextErrors = { ...currentErrors };
            delete nextErrors[roleId];

            return nextErrors;
        });
    };

    const validateTeamRoles = () => {
        const nextErrors = teamRoles.reduce<Record<number, TeamRoleErrors>>(
            (acc, role) => {
                if (!role.role.trim()) {
                    acc[role.id] = {
                        role: "Выберите специализацию",
                    };
                }
                if (
                    !Number.isInteger(role.requiredCount) ||
                    role.requiredCount < 1
                ) {
                    acc[role.id] = {
                        ...acc[role.id],
                        requiredCount: "Укажите минимум 1 место",
                    };
                }

                return acc;
            },
            {},
        );

        setRoleErrors(nextErrors);

        return Object.keys(nextErrors).length === 0;
    };

    const buildProjectPayload = (
        values: CreateProjectFormValues,
    ): CreateProjectSchema => ({
        title: values.title.trim(),
        description: values.description.trim(),
        type: values.type,
        format: values.format,
        city_id: values.cityId,
        ...(values.deadline?.trim()
            ? { deadline: `${values.deadline}T00:00:00` }
            : {}),
    });

    const onSubmit = async (values: CreateProjectFormValues) => {
        projectForm.clearErrors("root");

        if (!validateTeamRoles()) {
            return;
        }

        try {
            const project = await createProject({
                data: buildProjectPayload(values),
            });
            let failedVacanciesCount = 0;

            for (const teamRole of teamRoles) {
                const vacancyPayload: CreateProjectVacancySchema = {
                    team_role_id: teamRole.role,
                    required_count: teamRole.requiredCount,
                    ...(teamRole.description.trim()
                        ? { description: teamRole.description.trim() }
                        : {}),
                };

                if (teamRole.skillIds.length > 0) {
                    vacancyPayload.skill_ids = teamRole.skillIds;
                }

                try {
                    await createProjectVacancy({
                        projectId: project.id,
                        data: vacancyPayload,
                    });
                } catch {
                    failedVacanciesCount += 1;
                }
            }

            await queryClient.invalidateQueries({
                queryKey: getProjectsGetProjectsQueryKey(),
            });

            navigate(
                generatePath(routePaths.project, {
                    id: project.id,
                }),
                {
                    replace: true,
                    state: {
                        creationFeedback:
                            failedVacanciesCount > 0
                                ? {
                                      kind: "partial",
                                      failedVacanciesCount,
                                      totalVacancies: teamRoles.length,
                                  }
                                : {
                                      kind: "success",
                                      totalVacancies: teamRoles.length,
                                  },
                    },
                },
            );
        } catch (error) {
            const status = axios.isAxiosError(error)
                ? error.response?.status
                : undefined;

            projectForm.setError("root", {
                message:
                    status === HttpStatuses.BAD_REQUEST ||
                    status === HttpStatuses.CONFLICT
                        ? "Не удалось создать проект. Проверьте заполнение формы."
                        : "Не удалось сохранить проект. Попробуйте позже.",
            });
        }
    };

    if (isCitiesLoading || isSkillsLoading || isTeamRolesLoading) {
        return <Loader />;
    }

    if (citiesError || skillsError || teamRolesError) {
        return (
            <ErrorFallback
                title="Не удалось загрузить форму проекта"
                description="Справочники для создания проекта сейчас недоступны. Попробуйте обновить данные."
                error={(citiesError ?? skillsError ?? teamRolesError) as Error}
                onRetry={() => {
                    void refetchCities();
                    void refetchSkills();
                    void refetchTeamRoles();
                }}
            />
        );
    }

    return (
        <Stack spacing={3}>
            <Paper
                elevation={0}
                sx={{
                    borderRadius: 2.5,
                    p: { xs: 2, md: 3.5 },
                    bgcolor: "background.paper",
                }}
            >
                <Stack
                    component="form"
                    spacing={4}
                    onSubmit={projectForm.handleSubmit(onSubmit)}
                >
                    {projectForm.formState.errors.root && (
                        <Alert severity="error">
                            {projectForm.formState.errors.root.message}
                        </Alert>
                    )}

                    <CreateProjectBasicsSection
                        form={projectForm}
                        cities={cities}
                        isCitiesPending={false}
                        disabled={isSubmitting}
                    />
                    <CreateProjectTeamSection
                        teamRoles={teamRoles}
                        availableRoles={teamRoleOptions}
                        availableSkills={skills}
                        roleErrors={roleErrors}
                        disabled={isSubmitting}
                        onAddRole={handleAddRole}
                        onRemoveRole={handleRemoveRole}
                        onRoleChange={handleRoleChange}
                        onSkillsChange={handleSkillsChange}
                    />

                    <Stack
                        direction={{ xs: "column", sm: "row" }}
                        spacing={1.5}
                    >
                        <Button
                            variant="outlined"
                            onClick={() => navigate(-1)}
                            disabled={isSubmitting}
                            sx={{
                                minWidth: 140,
                                borderRadius: 2,
                            }}
                        >
                            Отмена
                        </Button>
                        <Button
                            variant="contained"
                            type="submit"
                            disabled={isSubmitting}
                            sx={{
                                minWidth: 140,
                                borderRadius: 2,
                                boxShadow: "none",
                            }}
                        >
                            Создать проект
                        </Button>
                    </Stack>
                </Stack>
            </Paper>
        </Stack>
    );
};

export default CreateProjectPage;
