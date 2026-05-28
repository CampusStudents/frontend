import { useState } from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    MenuItem,
    Stack,
    TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import {
    getProjectsGetProjectQueryKey,
    getProjectsGetProjectsQueryKey,
    queryClient,
    useProjectsDeleteProject,
    useProjectsUpdateProject,
} from "@shared/api";
import type {
    CityDTO,
    ProjectDTO,
    UpdateProjectSchema,
} from "@shared/api/generated/model";
import { ProjectFormat, ProjectType } from "@shared/api/generated/model";
import { routePaths } from "@shared/config";

type ProjectOwnerActionsProps = {
    project: ProjectDTO;
    cities: CityDTO[];
};

type ProjectEditFormState = {
    title: string;
    description: string;
    deadline: string;
    cityId: string;
    type: ProjectType;
    format: ProjectFormat;
};

const projectTypeOptions = [
    { value: ProjectType.study, label: "Учебный проект" },
    { value: ProjectType.startup, label: "Стартап" },
    { value: ProjectType.hackathon, label: "Хакатон" },
    { value: ProjectType.commercial, label: "Коммерческий проект" },
];

const projectFormatOptions = [
    { value: ProjectFormat.online, label: "Онлайн" },
    { value: ProjectFormat.offline, label: "Офлайн" },
    { value: ProjectFormat.hybrid, label: "Гибрид" },
];

const formatDateInputValue = (value?: string | null) =>
    value ? value.slice(0, 10) : "";

const createInitialFormState = (project: ProjectDTO): ProjectEditFormState => ({
    title: project.title,
    description: project.description ?? "",
    deadline: formatDateInputValue(project.deadline),
    cityId: project.city_id ?? "",
    type: project.type,
    format: project.format,
});

const buildUpdatePayload = (
    values: ProjectEditFormState,
): UpdateProjectSchema => ({
    title: values.title.trim(),
    description: values.description.trim() || null,
    type: values.type,
    format: values.format,
    city_id: values.cityId || null,
    deadline: values.deadline ? `${values.deadline}T00:00:00` : null,
});

const ProjectOwnerActions = ({ project, cities }: ProjectOwnerActionsProps) => {
    const navigate = useNavigate();
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [formState, setFormState] = useState<ProjectEditFormState>(() =>
        createInitialFormState(project),
    );
    const updateProjectMutation = useProjectsUpdateProject();
    const deleteProjectMutation = useProjectsDeleteProject();
    const isSubmitting =
        updateProjectMutation.isPending || deleteProjectMutation.isPending;

    const openEditDialog = () => {
        setFormState(createInitialFormState(project));
        setIsEditOpen(true);
    };

    const invalidateProjectQueries = async () => {
        await Promise.all([
            queryClient.invalidateQueries({
                queryKey: getProjectsGetProjectQueryKey(project.id),
            }),
            queryClient.invalidateQueries({
                queryKey: getProjectsGetProjectsQueryKey(),
            }),
        ]);
    };

    const handleSave = async () => {
        await updateProjectMutation.mutateAsync({
            projectId: project.id,
            data: buildUpdatePayload(formState),
        });
        await invalidateProjectQueries();
        setIsEditOpen(false);
    };

    const handleDelete = async () => {
        await deleteProjectMutation.mutateAsync({ projectId: project.id });
        await queryClient.invalidateQueries({
            queryKey: getProjectsGetProjectsQueryKey(),
        });
        setIsDeleteOpen(false);
        navigate(routePaths.projects, { replace: true });
    };

    return (
        <>
            <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={1.5}
                justifyContent="flex-end"
            >
                <Button variant="outlined" onClick={openEditDialog}>
                    Редактировать
                </Button>
                <Button
                    color="error"
                    variant="outlined"
                    onClick={() => setIsDeleteOpen(true)}
                >
                    Удалить
                </Button>
            </Stack>

            <Dialog
                open={isEditOpen}
                onClose={() => setIsEditOpen(false)}
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle>Редактировать проект</DialogTitle>
                <DialogContent>
                    <Stack spacing={2} sx={{ pt: 1 }}>
                        <TextField
                            label="Название"
                            value={formState.title}
                            disabled={isSubmitting}
                            onChange={(event) =>
                                setFormState((current) => ({
                                    ...current,
                                    title: event.target.value,
                                }))
                            }
                        />
                        <TextField
                            label="Описание"
                            value={formState.description}
                            disabled={isSubmitting}
                            multiline
                            minRows={4}
                            onChange={(event) =>
                                setFormState((current) => ({
                                    ...current,
                                    description: event.target.value,
                                }))
                            }
                        />
                        <TextField
                            label="Дедлайн"
                            type="date"
                            value={formState.deadline}
                            disabled={isSubmitting}
                            slotProps={{ inputLabel: { shrink: true } }}
                            onChange={(event) =>
                                setFormState((current) => ({
                                    ...current,
                                    deadline: event.target.value,
                                }))
                            }
                        />
                        <TextField
                            select
                            label="Город"
                            value={formState.cityId}
                            disabled={isSubmitting}
                            onChange={(event) =>
                                setFormState((current) => ({
                                    ...current,
                                    cityId: event.target.value,
                                }))
                            }
                        >
                            <MenuItem value="">Не указан</MenuItem>
                            {cities.map((city) => (
                                <MenuItem key={city.id} value={city.id}>
                                    {city.name}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            select
                            label="Тип"
                            value={formState.type}
                            disabled={isSubmitting}
                            onChange={(event) =>
                                setFormState((current) => ({
                                    ...current,
                                    type: event.target.value as ProjectType,
                                }))
                            }
                        >
                            {projectTypeOptions.map((option) => (
                                <MenuItem
                                    key={option.value}
                                    value={option.value}
                                >
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            select
                            label="Формат"
                            value={formState.format}
                            disabled={isSubmitting}
                            onChange={(event) =>
                                setFormState((current) => ({
                                    ...current,
                                    format: event.target.value as ProjectFormat,
                                }))
                            }
                        >
                            {projectFormatOptions.map((option) => (
                                <MenuItem
                                    key={option.value}
                                    value={option.value}
                                >
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button
                        disabled={isSubmitting}
                        onClick={() => setIsEditOpen(false)}
                    >
                        Отмена
                    </Button>
                    <Button
                        variant="contained"
                        disabled={isSubmitting || !formState.title.trim()}
                        onClick={() => void handleSave()}
                    >
                        Сохранить
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={isDeleteOpen}
                onClose={() => setIsDeleteOpen(false)}
                fullWidth
                maxWidth="xs"
            >
                <DialogTitle>Удалить проект?</DialogTitle>
                <DialogActions>
                    <Button
                        disabled={isSubmitting}
                        onClick={() => setIsDeleteOpen(false)}
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

export default ProjectOwnerActions;
