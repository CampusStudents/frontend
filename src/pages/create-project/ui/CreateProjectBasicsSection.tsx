import { Controller, type UseFormReturn } from "react-hook-form";
import {
    Autocomplete,
    MenuItem,
    Stack,
    TextField,
    Typography,
} from "@mui/material";

import type { CreateProjectFormValues } from "../model/createProjectForm";

import type { CityDTO } from "@shared/api/generated/model";
import type { EventDTO } from "@shared/api/liveApi";
import { fieldHelper } from "@shared/lib/form";

const selectMenuProps = {
    PaperProps: {
        sx: {
            width: "min(420px, calc(100vw - 32px))",
            maxHeight: 320,
        },
    },
};

const projectTypeOptions = [
    { value: "study", label: "Учебный проект" },
    { value: "startup", label: "Стартап" },
    { value: "hackathon", label: "Хакатон" },
    { value: "commercial", label: "Коммерческий проект" },
];

const projectFormatOptions = [
    { value: "online", label: "Онлайн" },
    { value: "offline", label: "Оффлайн" },
    { value: "hybrid", label: "Гибрид" },
];

type CreateProjectBasicsSectionProps = {
    form: UseFormReturn<CreateProjectFormValues>;
    cities: CityDTO[];
    events: EventDTO[];
    isCitiesPending: boolean;
    disabled?: boolean;
};

const CreateProjectBasicsSection = ({
    form,
    cities,
    events,
    isCitiesPending,
    disabled = false,
}: CreateProjectBasicsSectionProps) => {
    const {
        control,
        register,
        formState: { errors },
    } = form;
    const { ref: titleRef, ...title } = register("title");
    const { ref: deadlineRef, ...deadline } = register("deadline");
    const { ref: descriptionRef, ...description } = register("description");

    return (
        <Stack spacing={2.5}>
            <Typography
                sx={{
                    fontSize: { xs: 28, md: 34 },
                    fontWeight: 600,
                    lineHeight: 1.1,
                }}
            >
                Создание проекта
            </Typography>

            <Stack spacing={2}>
                <TextField
                    {...title}
                    inputRef={titleRef}
                    label="Название проекта"
                    placeholder="Super Mario"
                    fullWidth
                    size="small"
                    disabled={disabled}
                    error={Boolean(errors.title)}
                    helperText={fieldHelper(errors.title?.message)}
                />
                <Controller
                    control={control}
                    name="eventId"
                    render={({ field }) => (
                        <Autocomplete
                            options={events}
                            value={
                                events.find(
                                    (event) => event.id === field.value,
                                ) ?? null
                            }
                            getOptionLabel={(event) => event.title}
                            isOptionEqualToValue={(option, value) =>
                                option.id === value.id
                            }
                            disabled={disabled}
                            onChange={(_, value) =>
                                field.onChange(value?.id ?? "")
                            }
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Мероприятие"
                                    placeholder="Найти мероприятие"
                                    size="small"
                                    error={Boolean(errors.eventId)}
                                    helperText={
                                        fieldHelper(errors.eventId?.message) ||
                                        "Можно оставить пустым"
                                    }
                                />
                            )}
                        />
                    )}
                />
                <TextField
                    {...deadline}
                    inputRef={deadlineRef}
                    label="Дедлайн"
                    type="date"
                    fullWidth
                    size="small"
                    disabled={disabled}
                    error={Boolean(errors.deadline)}
                    helperText={fieldHelper(errors.deadline?.message)}
                    slotProps={{
                        inputLabel: {
                            shrink: true,
                        },
                    }}
                />
                <TextField
                    {...description}
                    inputRef={descriptionRef}
                    label="Описание"
                    placeholder="Расскажите кратко о проекте, целях и формате участия."
                    fullWidth
                    multiline
                    minRows={4}
                    size="small"
                    disabled={disabled}
                    error={Boolean(errors.description)}
                    helperText={fieldHelper(errors.description?.message)}
                />

                <Controller
                    control={control}
                    name="cityId"
                    render={({ field }) => (
                        <TextField
                            {...field}
                            value={field.value ?? ""}
                            fullWidth
                            select
                            label="Город"
                            size="small"
                            disabled={disabled || isCitiesPending}
                            error={Boolean(errors.cityId)}
                            helperText={fieldHelper(errors.cityId?.message)}
                            slotProps={{
                                select: {
                                    MenuProps: selectMenuProps,
                                },
                            }}
                        >
                            <MenuItem value="">Выберите город</MenuItem>
                            {cities.map((city) => (
                                <MenuItem key={city.id} value={city.id}>
                                    {city.name}
                                </MenuItem>
                            ))}
                        </TextField>
                    )}
                />

                <Stack
                    direction={{ xs: "column", md: "row" }}
                    spacing={2}
                    alignItems={{ xs: "stretch", md: "center" }}
                >
                    <Controller
                        control={control}
                        name="type"
                        render={({ field }) => (
                            <TextField
                                {...field}
                                value={field.value ?? ""}
                                fullWidth
                                select
                                label="Тип проекта"
                                size="small"
                                disabled={disabled}
                                error={Boolean(errors.type)}
                                helperText={fieldHelper(errors.type?.message)}
                                sx={{ maxWidth: { md: 320 } }}
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
                        )}
                    />
                    <Controller
                        control={control}
                        name="format"
                        render={({ field }) => (
                            <TextField
                                {...field}
                                value={field.value ?? ""}
                                fullWidth
                                select
                                label="Формат"
                                size="small"
                                disabled={disabled}
                                error={Boolean(errors.format)}
                                helperText={fieldHelper(errors.format?.message)}
                                sx={{ maxWidth: { md: 240 } }}
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
                        )}
                    />
                </Stack>
            </Stack>
        </Stack>
    );
};

export default CreateProjectBasicsSection;
