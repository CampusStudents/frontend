import { Alert, Button, Paper, Stack } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { generatePath, useNavigate, useSearchParams } from "react-router-dom";
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
import { getEvents, getEventsQueryKey } from "@shared/api/liveApi";

const CreateProjectPage = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const initialEventId = searchParams.get("eventId") ?? "";
    const projectForm = useForm<CreateProjectFormValues>({
        resolver: createProjectResolver,
        defaultValues: {
            ...createProjectDefaultValues,
            eventId: initialEventId,
        },
        mode: "onBlur",
    });
    const [teamRoles, setTeamRoles] = useState<TeamRole[]>([
        createDefaultTeamRole(),
    ]);
    const [roleErrors, setRoleErrors] = useState<
        Record<number, TeamRoleErrors>
    >({});
    const [isSaving, setIsSaving] = useState(false);
    const submitLockRef = useRef(false);

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
    const {
        data: events = [],
        isLoading: isEventsLoading,
        error: eventsError,
        refetch: refetchEvents,
    } = useQuery({
        queryKey: getEventsQueryKey(),
        queryFn: ({ signal }) => getEvents(undefined, signal),
        staleTime: time.m(5),
    });

    const { mutateAsync: createProject, isPending: isCreatingProject } =
        useProjectsCreateProject();
    const { mutateAsync: createProjectVacancy, isPending: isCreatingVacancy } =
        useProjectsCreateProjectVacancy();

    const isSubmitting = isSaving || isCreatingProject || isCreatingVacancy;
    const cities = citiesResponse ?? [];
    const skills = skillsResponse ?? [];
    const teamRoleOptions = teamRoleOptionsResponse ?? [];

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
        ...(values.eventId?.trim() ? { event_id: values.eventId.trim() } : {}),
        ...(values.deadline?.trim()
            ? { deadline: `${values.deadline}T00:00:00` }
            : {}),
    });

    const onSubmit = async (values: CreateProjectFormValues) => {
        if (submitLockRef.current) {
            return;
        }

        projectForm.clearErrors("root");

        if (!validateTeamRoles()) {
            return;
        }

        submitLockRef.current = true;
        setIsSaving(true);

        let project;

        try {
            project = await createProject({
                data: buildProjectPayload(values),
            });
        } catch (error) {
            const status = axios.isAxiosError(error)
                ? error.response?.status
                : undefined;

            submitLockRef.current = false;
            setIsSaving(false);
            projectForm.setError("root", {
                message:
                    status === HttpStatuses.BAD_REQUEST ||
                    status === HttpStatuses.CONFLICT
                        ? "Не удалось создать проект. Проверьте заполнение формы."
                        : "Не удалось сохранить проект. Попробуйте позже.",
            });
            return;
        }

        const vacancyResults = await Promise.allSettled(
            teamRoles.map((teamRole) => {
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

                return createProjectVacancy({
                    projectId: project.id,
                    data: vacancyPayload,
                });
            }),
        );
        const failedVacanciesCount = vacancyResults.filter(
            (result) => result.status === "rejected",
        ).length;

        await queryClient
            .invalidateQueries({
                queryKey: getProjectsGetProjectsQueryKey(),
            })
            .catch(() => undefined);

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
    };
    if (
        isCitiesLoading ||
        isSkillsLoading ||
        isTeamRolesLoading ||
        isEventsLoading
    ) {
        return <Loader />;
    }

    if (citiesError || skillsError || teamRolesError || eventsError) {
        return (
            <ErrorFallback
                title="Не удалось загрузить форму проекта"
                description="Справочники для создания проекта сейчас недоступны. Попробуйте обновить данные."
                error={
                    (citiesError ??
                        skillsError ??
                        teamRolesError ??
                        eventsError) as Error
                }
                onRetry={() => {
                    void refetchCities();
                    void refetchSkills();
                    void refetchTeamRoles();
                    void refetchEvents();
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
                        events={events}
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
