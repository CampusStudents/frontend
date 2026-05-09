import { useState } from "react";
import {
    Alert,
    Box,
    Button,
    IconButton,
    InputAdornment,
    Link,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import MarkEmailUnreadOutlinedIcon from "@mui/icons-material/MarkEmailUnreadOutlined";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import axios from "axios";

import {
    registerAccountDefaultValues,
    registerAccountResolver,
    type RegisterAccountFormValues,
} from "../model/registerForm";

import { authLogin, authRegister, HttpStatuses } from "@shared/api";
import { routePaths } from "@shared/config";
import { tokenStorage } from "@shared/lib/auth";
import { fieldHelper } from "@shared/lib/form";
import { FormWrapper } from "@shared/ui/FormWrapper";

const RegisterPage = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const {
        register,
        handleSubmit,
        setError,
        clearErrors,
        formState: { errors },
    } = useForm<RegisterAccountFormValues>({
        resolver: registerAccountResolver,
        defaultValues: registerAccountDefaultValues,
        mode: "onBlur",
    });

    const registerAccountMutation = useMutation({
        mutationFn: async (data: RegisterAccountFormValues) => {
            await authRegister({
                email: data.email,
                password: data.password,
            });

            const { access_token } = await authLogin({
                email: data.email,
                password: data.password,
            });

            tokenStorage.set(access_token);
            return data.email;
        },
        onSuccess: (email) => {
            navigate(routePaths.verifyEmailPending, {
                replace: true,
                state: { email },
            });
        },
        onError: (error) => {
            const status = axios.isAxiosError(error)
                ? error.response?.status
                : undefined;

            setError("root", {
                message:
                    status === HttpStatuses.BAD_REQUEST ||
                    status === HttpStatuses.CONFLICT
                        ? "Пользователь с таким email уже существует"
                        : "Не удалось создать аккаунт. Попробуйте позже.",
            });
        },
    });

    const onSubmit = (data: RegisterAccountFormValues) => {
        clearErrors("root");
        registerAccountMutation.mutate(data);
    };

    const renderPasswordIcon = (isVisible: boolean, toggle: () => void) => (
        <InputAdornment position="end">
            <IconButton onClick={toggle} edge="end" size="small">
                {isVisible ? <Visibility /> : <VisibilityOff />}
            </IconButton>
        </InputAdornment>
    );

    const renderForm = () => {
        const { ref: emailRef, ...email } = register("email");
        const { ref: passwordRef, ...password } = register("password");
        const { ref: confirmPasswordRef, ...confirmPassword } =
            register("confirmPassword");

        return (
            <>
                {errors.root && (
                    <Alert severity="error" sx={{ mb: 1 }}>
                        {errors.root.message}
                    </Alert>
                )}

                <TextField
                    {...email}
                    inputRef={emailRef}
                    fullWidth
                    label="Email"
                    type="email"
                    placeholder="name@university.edu"
                    error={Boolean(errors.email)}
                    helperText={fieldHelper(errors.email?.message)}
                />

                <TextField
                    {...password}
                    inputRef={passwordRef}
                    fullWidth
                    label="Пароль"
                    placeholder="Минимум 8 символов"
                    type={showPassword ? "text" : "password"}
                    error={Boolean(errors.password)}
                    helperText={fieldHelper(errors.password?.message)}
                    slotProps={{
                        input: {
                            endAdornment: renderPasswordIcon(showPassword, () =>
                                setShowPassword(!showPassword),
                            ),
                        },
                    }}
                />

                <TextField
                    {...confirmPassword}
                    inputRef={confirmPasswordRef}
                    fullWidth
                    label="Повторите пароль"
                    placeholder="Повторите пароль"
                    type={showConfirmPassword ? "text" : "password"}
                    error={Boolean(errors.confirmPassword)}
                    helperText={fieldHelper(errors.confirmPassword?.message)}
                    slotProps={{
                        input: {
                            endAdornment: renderPasswordIcon(
                                showConfirmPassword,
                                () =>
                                    setShowConfirmPassword(
                                        !showConfirmPassword,
                                    ),
                            ),
                        },
                    }}
                />
            </>
        );
    };

    return (
        <FormWrapper
            onSubmit={handleSubmit(onSubmit)}
            renderTitle={() => "Регистрация"}
            renderDescription={() =>
                "Создайте аккаунт. После подтверждения почты сразу перейдём к заполнению профиля."
            }
            renderActions={() => (
                <Stack
                    direction="row"
                    spacing={1}
                    sx={{
                        width: "100%",
                        "& > *": {
                            flex: 1,
                        },
                    }}
                >
                    <Box
                        sx={{
                            p: 1.5,
                            border: 1,
                            borderColor: "primary.main",
                            borderRadius: 1.5,
                            bgcolor: "primary.50",
                        }}
                    >
                        <PersonAddAltOutlinedIcon
                            color="primary"
                            fontSize="small"
                        />
                        <Typography fontWeight={700} fontSize="0.875rem">
                            Аккаунт
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            p: 1.5,
                            border: 1,
                            borderColor: "divider",
                            borderRadius: 1.5,
                            color: "text.secondary",
                        }}
                    >
                        <MarkEmailUnreadOutlinedIcon fontSize="small" />
                        <Typography fontWeight={700} fontSize="0.875rem">
                            Почта
                        </Typography>
                    </Box>
                </Stack>
            )}
            renderFields={renderForm}
            renderSubmit={() => (
                <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    disabled={registerAccountMutation.isPending}
                >
                    Создать аккаунт
                </Button>
            )}
            renderFooter={() => (
                <Typography color="text.secondary">
                    Уже есть аккаунт?{" "}
                    <Link
                        component={RouterLink}
                        to={routePaths.login}
                        underline="hover"
                        sx={{ fontWeight: 600 }}
                    >
                        Войти
                    </Link>
                </Typography>
            )}
        />
    );
};

export default RegisterPage;
