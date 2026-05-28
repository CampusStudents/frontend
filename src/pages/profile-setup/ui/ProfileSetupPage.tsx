import { Controller, useForm, useWatch } from "react-hook-form";
import {
    Alert,
    Box,
    Button,
    Chip,
    MenuItem,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import {
    profileSetupDefaultValues,
    profileSetupResolver,
    type ProfileSetupFormValues,
} from "../model/profileSetupForm";

import {
    HttpStatuses,
    getAuthGetUserQueryKey,
    normalizeListResponse,
    queryClient,
    useCitiesGetCities,
    usersCreateMyProfile,
    useUniversitiesGetUniversities,
} from "@shared/api";
import { routePaths } from "@shared/config";
import { fieldHelper } from "@shared/lib/form";
import { FormWrapper } from "@shared/ui/FormWrapper";

const selectMenuProps = {
    PaperProps: {
        sx: {
            width: "min(500px, calc(100vw - 32px))",
            maxHeight: 320,
        },
    },
    MenuListProps: {
        sx: {
            "& .MuiMenuItem-root": {
                whiteSpace: "normal",
                lineHeight: 1.35,
                py: 1,
            },
        },
    },
};

const ProfileSetupPage = () => {
    const navigate = useNavigate();

    const profileForm = useForm<ProfileSetupFormValues>({
        resolver: profileSetupResolver,
        defaultValues: profileSetupDefaultValues,
        mode: "onBlur",
    });

    const selectedCityId = useWatch({
        control: profileForm.control,
        name: "cityId",
    });

    const { data: citiesResponse, isPending: isCitiesPending } =
        useCitiesGetCities(
            { limit: 100 },
            {
                query: {
                    staleTime: 5 * 60 * 1000,
                },
            },
        );

    const { data: universitiesResponse, isPending: isUniversitiesPending } =
        useUniversitiesGetUniversities(
            selectedCityId
                ? { limit: 100, city_id: [selectedCityId] }
                : { limit: 100 },
            {
                query: {
                    staleTime: 5 * 60 * 1000,
                },
            },
        );
    const cities = normalizeListResponse(citiesResponse);
    const universities = normalizeListResponse(universitiesResponse);

    const createProfileMutation = useMutation({
        mutationFn: (data: ProfileSetupFormValues) =>
            usersCreateMyProfile({
                first_name: data.firstName.trim(),
                last_name: data.lastName.trim(),
                city_id: data.cityId,
                university_id: data.universityId,
                ...(data.bio.trim() ? { bio: data.bio.trim() } : {}),
            }),
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: getAuthGetUserQueryKey(),
            });
            navigate(routePaths.profile, { replace: true });
        },
        onError: (error) => {
            const status = axios.isAxiosError(error)
                ? error.response?.status
                : undefined;

            profileForm.setError("root", {
                message:
                    status === HttpStatuses.BAD_REQUEST ||
                    status === HttpStatuses.CONFLICT
                        ? "Не удалось сохранить профиль. Проверьте данные."
                        : "Не удалось создать профиль. Попробуйте позже.",
            });
        },
    });

    const onSubmit = (data: ProfileSetupFormValues) => {
        profileForm.clearErrors("root");
        createProfileMutation.mutate(data);
    };

    const renderFields = () => {
        const { ref: firstNameRef, ...firstName } =
            profileForm.register("firstName");
        const { ref: lastNameRef, ...lastName } =
            profileForm.register("lastName");
        const { ref: bioRef, ...bio } = profileForm.register("bio");
        const profileErrors = profileForm.formState.errors;

        return (
            <>
                {profileErrors.root && (
                    <Alert severity="error" sx={{ mb: 1 }}>
                        {profileErrors.root.message}
                    </Alert>
                )}

                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                        gap: 1.25,
                    }}
                >
                    <TextField
                        {...firstName}
                        inputRef={firstNameRef}
                        fullWidth
                        label="Имя"
                        placeholder="Иван"
                        error={Boolean(profileErrors.firstName)}
                        helperText={fieldHelper(
                            profileErrors.firstName?.message,
                        )}
                    />

                    <TextField
                        {...lastName}
                        inputRef={lastNameRef}
                        fullWidth
                        label="Фамилия"
                        placeholder="Иванов"
                        error={Boolean(profileErrors.lastName)}
                        helperText={fieldHelper(
                            profileErrors.lastName?.message,
                        )}
                    />
                </Box>

                <Controller
                    control={profileForm.control}
                    name="cityId"
                    render={({ field }) => (
                        <TextField
                            {...field}
                            value={field.value ?? ""}
                            fullWidth
                            select
                            label="Город"
                            disabled={isCitiesPending}
                            error={Boolean(profileErrors.cityId)}
                            helperText={fieldHelper(
                                profileErrors.cityId?.message,
                            )}
                            slotProps={{
                                select: {
                                    MenuProps: selectMenuProps,
                                },
                            }}
                            onChange={(event) => {
                                field.onChange(event.target.value);
                                profileForm.setValue("universityId", "", {
                                    shouldDirty: true,
                                });
                                profileForm.clearErrors("universityId");
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

                <Controller
                    control={profileForm.control}
                    name="universityId"
                    render={({ field }) => (
                        <TextField
                            {...field}
                            value={field.value ?? ""}
                            fullWidth
                            select
                            label="Вуз"
                            disabled={isUniversitiesPending}
                            error={Boolean(profileErrors.universityId)}
                            helperText={fieldHelper(
                                profileErrors.universityId?.message,
                            )}
                            slotProps={{
                                select: {
                                    MenuProps: selectMenuProps,
                                },
                            }}
                        >
                            <MenuItem value="">Выберите вуз</MenuItem>
                            {universities.map((university) => (
                                <MenuItem
                                    key={university.id}
                                    value={university.id}
                                >
                                    {university.name}
                                </MenuItem>
                            ))}
                        </TextField>
                    )}
                />

                <TextField
                    {...bio}
                    inputRef={bioRef}
                    fullWidth
                    multiline
                    minRows={3}
                    label="О себе"
                    placeholder="Коротко о навыках, интересах или опыте"
                    error={Boolean(profileErrors.bio)}
                    helperText={fieldHelper(profileErrors.bio?.message)}
                />
            </>
        );
    };

    return (
        <FormWrapper
            onSubmit={profileForm.handleSubmit(onSubmit)}
            renderTitle={() => "Заполните профиль"}
            renderDescription={() =>
                "Почта подтверждена. Осталось добавить данные, чтобы другие участники понимали, кто вы и где учитесь."
            }
            renderActions={() => (
                <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                    <Chip
                        icon={<BadgeOutlinedIcon />}
                        label="Личные данные"
                        color="primary"
                        variant="outlined"
                    />
                    <Chip
                        icon={<SchoolOutlinedIcon />}
                        label="Город и вуз"
                        color="primary"
                    />
                </Stack>
            )}
            renderFields={renderFields}
            renderSubmit={() => (
                <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    disabled={createProfileMutation.isPending}
                >
                    Сохранить профиль
                </Button>
            )}
            renderFooter={() => (
                <Typography color="text.secondary" fontSize="0.875rem">
                    Эти данные можно будет обновить позже в профиле.
                </Typography>
            )}
        />
    );
};

export default ProfileSetupPage;
