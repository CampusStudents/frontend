import { useState } from "react";
import {
    Alert,
    Button,
    Checkbox,
    FormControlLabel,
    IconButton,
    InputAdornment,
    Link,
    Snackbar,
    TextField,
    Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

import {
    loginDefaultValues,
    loginSchema,
    type LoginFormValues,
} from "../model/loginForm";

import { HttpStatuses, useLoginApiV1AuthLoginPost } from "@shared/api";
import { routePaths } from "@shared/config";
import { tokenStorage } from "@shared/lib/auth";
import { fieldHelper } from "@shared/lib/form";
import { FormWrapper } from "@shared/ui/FormWrapper";

type LoginLocationState = { registered?: boolean } | null;

const LoginPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [showPassword, setShowPassword] = useState(false);
    const [registeredToastOpen, setRegisteredToastOpen] = useState(() => {
        const state = location.state as LoginLocationState;
        if (state?.registered) {
            window.history.replaceState({}, "");
            return true;
        }
        return false;
    });

    const {
        register,
        handleSubmit,
        setError,
        clearErrors,
        formState: { errors },
    } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: loginDefaultValues,
        mode: "onBlur",
    });

    const { mutate: login, isPending } = useLoginApiV1AuthLoginPost({
        mutation: {
            onSuccess: ({ access_token }) => {
                tokenStorage.set(access_token);
                navigate(routePaths.verifyEmailPending, { replace: true });
            },
            onError: (error) => {
                const status = axios.isAxiosError(error)
                    ? error.response?.status
                    : undefined;

                setError("root", {
                    message:
                        status === HttpStatuses.UNAUTHORIZED
                            ? "Неверный email или пароль"
                            : "Не удалось войти. Попробуйте позже.",
                });
            },
        },
    });

    const onSubmit = (data: LoginFormValues) => {
        clearErrors("root");
        login({ data });
    };

    const renderPasswordAdornment = () => (
        <InputAdornment position="end">
            <IconButton
                onClick={() => setShowPassword((prev) => !prev)}
                edge="end"
                size="small"
            >
                {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
        </InputAdornment>
    );

    const renderForm = () => {
        const { ref: emailRef, ...email } = register("email");
        const { ref: passwordRef, ...password } = register("password");

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
                    slotProps={{
                        input: {
                            disableUnderline: true,
                        },
                    }}
                />

                <TextField
                    {...password}
                    inputRef={passwordRef}
                    fullWidth
                    label="Пароль"
                    type={showPassword ? "text" : "password"}
                    placeholder="Введите пароль"
                    error={Boolean(errors.password)}
                    helperText={fieldHelper(errors.password?.message)}
                    slotProps={{
                        input: {
                            disableUnderline: true,
                            endAdornment: renderPasswordAdornment(),
                        },
                    }}
                />

                <FormControlLabel
                    control={<Checkbox size="small" />}
                    label="Запомнить меня"
                    sx={{
                        mt: -0.25,
                        color: "text.secondary",
                        "& .MuiTypography-root": {
                            fontSize: "0.875rem",
                        },
                    }}
                />
            </>
        );
    };

    return (
        <>
            <FormWrapper
                onSubmit={handleSubmit(onSubmit)}
                renderTitle={() => "Вход"}
                renderDescription={() =>
                    "Войдите, чтобы управлять заявками, проектами и своим участием в campus."
                }
                renderFields={renderForm}
                renderSubmit={() => (
                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        size="large"
                        sx={{ minHeight: 48 }}
                        disabled={isPending}
                    >
                        Войти
                    </Button>
                )}
                renderFooter={() => (
                    <>
                        <Link
                            component={RouterLink}
                            to={routePaths.home}
                            underline="hover"
                            color="text.secondary"
                            sx={{ fontSize: "0.875rem" }}
                        >
                            Забыли пароль?
                        </Link>

                        <Typography color="grey.500" sx={{ mt: 1.5 }}>
                            Нет аккаунта?{" "}
                            <Link
                                component={RouterLink}
                                to={routePaths.register}
                                underline="hover"
                                sx={{ fontWeight: 600 }}
                            >
                                Регистрация
                            </Link>
                        </Typography>
                    </>
                )}
            />
            <Snackbar
                open={registeredToastOpen}
                autoHideDuration={6000}
                onClose={() => setRegisteredToastOpen(false)}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
                <Alert
                    onClose={() => setRegisteredToastOpen(false)}
                    severity="success"
                    variant="filled"
                    sx={{ width: "100%" }}
                >
                    Вы успешно зарегистрировались. Теперь войдите в аккаунт.
                </Alert>
            </Snackbar>
        </>
    );
};

export default LoginPage;
