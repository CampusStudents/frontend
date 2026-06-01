import { useState } from "react";
import {
    Button,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    MenuItem,
    Paper,
    Stack,
    TextField,
    Typography,
} from "@mui/material";

import {
    getProjectsGetProjectVacanciesQueryKey,
    queryClient,
    useProjectsCreateProjectVacancy,
    useProjectsDeleteProjectVacancy,
    useProjectsUpdateProjectVacancy,
} from "@shared/api";
import type {
    CreateProjectVacancySchema,
    ProjectVacancyDTO,
    SkillDTO,
    TeamRoleDTO,
    UpdateProjectVacancySchema,
} from "@shared/api/generated/model";

type ProjectVacanciesManagerProps = {
    projectId: string;
    vacancies: ProjectVacancyDTO[];
    teamRoles: TeamRoleDTO[];
    skills: SkillDTO[];
};

type VacancyFormState = {
    id?: string;
    teamRoleId: string;
    requiredCount: number;
    description: string;
    skillIds: string[];
};

const createEmptyFormState = (): VacancyFormState => ({
    teamRoleId: "",
    requiredCount: 1,
    description: "",
    skillIds: [],
});

const mapVacancyToFormState = (
    vacancy: ProjectVacancyDTO,
): VacancyFormState => ({
    id: vacancy.id,
    teamRoleId: vacancy.team_role_id,
    requiredCount: vacancy.required_count,
    description: vacancy.description ?? "",
    skillIds: vacancy.skill_ids ?? vacancy.skills.map((skill) => skill.id),
});

const buildCreatePayload = (
    values: VacancyFormState,
): CreateProjectVacancySchema => ({
    team_role_id: values.teamRoleId,
    required_count: values.requiredCount,
    description: values.description.trim() || null,
    skill_ids: values.skillIds,
});

const buildUpdatePayload = (
    values: VacancyFormState,
): UpdateProjectVacancySchema => ({
    team_role_id: values.teamRoleId,
    required_count: values.requiredCount,
    description: values.description.trim() || null,
    skill_ids: values.skillIds,
});

const ProjectVacanciesManager = ({
                                     projectId,
                                     vacancies,
                                     teamRoles,
                                     skills,
                                 }: ProjectVacanciesManagerProps) => {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [deleteVacancyId, setDeleteVacancyId] = useState<string | null>(null);
    const [formState, setFormState] = useState<VacancyFormState>(() =>
        createEmptyFormState(),
    );
    const createVacancyMutation = useProjectsCreateProjectVacancy();
    const updateVacancyMutation = useProjectsUpdateProjectVacancy();
    const deleteVacancyMutation = useProjectsDeleteProjectVacancy();
    const isSubmitting =
        createVacancyMutation.isPending ||
        updateVacancyMutation.isPending ||
        deleteVacancyMutation.isPending;

    const invalidateVacancies = async () => {
        await queryClient.invalidateQueries({
            queryKey: getProjectsGetProjectVacanciesQueryKey(projectId),
        });
    };

    const openCreateDialog = () => {
        setFormState({
            ...createEmptyFormState(),
            teamRoleId: teamRoles[0]?.id ?? "",
        });
        setIsFormOpen(true);
    };

    const openEditDialog = (vacancy: ProjectVacancyDTO) => {
        setFormState(mapVacancyToFormState(vacancy));
        setIsFormOpen(true);
    };

    const handleSave = async () => {
        if (!formState.teamRoleId) {
            return;
        }

        if (formState.id) {
            await updateVacancyMutation.mutateAsync({
                projectId,
                vacancyId: formState.id,
                data: buildUpdatePayload(formState),
            });
        } else {
            await createVacancyMutation.mutateAsync({
                projectId,
                data: buildCreatePayload(formState),
            });
        }

        await invalidateVacancies();
        setIsFormOpen(false);
    };

    const handleDelete = async () => {
        if (!deleteVacancyId) {
            return;
        }

        await deleteVacancyMutation.mutateAsync({
            projectId,
            vacancyId: deleteVacancyId,
        });
        await invalidateVacancies();
        setDeleteVacancyId(null);
    };

    return (
        <>
            <Paper
                elevation={0}
                sx={{
                    borderRadius: 2,
                    p: { xs: 2, md: 3 },
                }}
            >
                <Stack spacing={2}>
                    <Stack
                        direction={{ xs: "column", sm: "row" }}
                        spacing={1.5}
                        alignItems={{ xs: "stretch", sm: "center" }}
                        justifyContent="space-between"
                    >
                        <Typography
                            sx={{
                                fontSize: { xs: 22, md: 26 },
                                fontWeight: 600,
                            }}
                        >
                            Управление ролями
                        </Typography>
                        <Button variant="contained" onClick={openCreateDialog}>
                            Добавить роль
                        </Button>
                    </Stack>

                    {vacancies.length > 0 ? (
                        <Stack spacing={1.5}>
                            {vacancies.map((vacancy) => {
                                const role = teamRoles.find(
                                    (item) => item.id === vacancy.team_role_id,
                                );
                                const skillNames = vacancy.skills.map(
                                    (skill) => skill.name,
                                );

                                return (
                                    <Paper
                                        key={vacancy.id}
                                        variant="outlined"
                                        sx={{
                                            borderRadius: 1.5,
                                            p: 2,
                                        }}
                                    >
                                        <Stack spacing={1.25}>
                                            <Stack
                                                direction={{
                                                    xs: "column",
                                                    sm: "row",
                                                }}
                                                spacing={1}
                                                justifyContent="space-between"
                                            >
                                                <Typography fontWeight={600}>
                                                    {role?.name ??
                                                        "Роль не указана"}
                                                </Typography>
                                                <Stack
                                                    direction="row"
                                                    spacing={1}
                                                >
                                                    <Button
                                                        size="small"
                                                        variant="outlined"
                                                        onClick={() =>
                                                            openEditDialog(
                                                                vacancy,
                                                            )
                                                        }
                                                    >
                                                        Редактировать
                                                    </Button>
                                                    <Button
                                                        size="small"
                                                        color="error"
                                                        variant="outlined"
                                                        onClick={() =>
                                                            setDeleteVacancyId(
                                                                vacancy.id,
                                                            )
                                                        }
                                                    >
                                                        Удалить
                                                    </Button>
                                                </Stack>
                                            </Stack>
                                            <Typography
                                                variant="body2"
                                                color="text.secondary"
                                            >
                                                Мест: {vacancy.required_count}
                                            </Typography>
                                            {vacancy.description ? (
                                                <Typography variant="body2">
                                                    {vacancy.description}
                                                </Typography>
                                            ) : null}
                                            {skillNames.length > 0 ? (
                                                <Stack
                                                    direction="row"
                                                    spacing={1}
                                                    useFlexGap
                                                    flexWrap="wrap"
                                                >
                                                    {skillNames.map((skill) => (
                                                        <Chip
                                                            key={skill}
                                                            label={skill}
                                                            size="small"
                                                        />
                                                    ))}
                                                </Stack>
                                            ) : null}
                                        </Stack>
                                    </Paper>
                                );
                            })}
                        </Stack>
                    ) : (
                        <Typography color="text.secondary">
                            У проекта пока нет открытых ролей.
                        </Typography>
                    )}
                </Stack>
            </Paper>

            <Dialog
                open={isFormOpen}
                onClose={() => setIsFormOpen(false)}
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle>
                    {formState.id ? "Редактировать роль" : "Добавить роль"}
                </DialogTitle>
                <DialogContent>
                    <Stack spacing={2} sx={{ pt: 1 }}>
                        <TextField
                            select
                            label="Роль"
                            value={formState.teamRoleId}
                            disabled={isSubmitting}
                            onChange={(event) =>
                                setFormState((current) => ({
                                    ...current,
                                    teamRoleId: event.target.value,
                                }))
                            }
                        >
                            {teamRoles.map((role) => (
                                <MenuItem key={role.id} value={role.id}>
                                    {role.name}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            label="Количество мест"
                            type="number"
                            value={formState.requiredCount}
                            disabled={isSubmitting}
                            slotProps={{
                                htmlInput: {
                                    min: 1,
                                },
                            }}
                            onChange={(event) =>
                                setFormState((current) => ({
                                    ...current,
                                    requiredCount: Math.max(
                                        1,
                                        Number(event.target.value),
                                    ),
                                }))
                            }
                        />
                        <TextField
                            label="Описание"
                            value={formState.description}
                            disabled={isSubmitting}
                            multiline
                            minRows={3}
                            onChange={(event) =>
                                setFormState((current) => ({
                                    ...current,
                                    description: event.target.value,
                                }))
                            }
                        />
                        <TextField
                            select
                            label="Навыки"
                            value={formState.skillIds}
                            disabled={isSubmitting}
                            slotProps={{
                                select: {
                                    multiple: true,
                                },
                            }}
                            onChange={(event) => {
                                const value = event.target.value;

                                setFormState((current) => ({
                                    ...current,
                                    skillIds:
                                        typeof value === "string"
                                            ? value.split(",")
                                            : value,
                                }));
                            }}
                        >
                            {skills.map((skill) => (
                                <MenuItem key={skill.id} value={skill.id}>
                                    {skill.name}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button
                        disabled={isSubmitting}
                        onClick={() => setIsFormOpen(false)}
                    >
                        Отмена
                    </Button>
                    <Button
                        variant="contained"
                        disabled={isSubmitting || !formState.teamRoleId}
                        onClick={() => void handleSave()}
                    >
                        Сохранить
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={Boolean(deleteVacancyId)}
                onClose={() => setDeleteVacancyId(null)}
                fullWidth
                maxWidth="xs"
            >
                <DialogTitle>Удалить роль?</DialogTitle>
                <DialogActions>
                    <Button
                        disabled={isSubmitting}
                        onClick={() => setDeleteVacancyId(null)}
                    >
                        Отмена
                    </Button>
                    <Button
                        color="error"
                        variant="contained"
                        disabled={isSubmitting}
                        onClick={() => void handleDelete()}
                    >
                        Удалить
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default ProjectVacanciesManager;