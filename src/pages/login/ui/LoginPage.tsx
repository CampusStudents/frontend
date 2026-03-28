import { useState } from "react";
import {
    Button,
    Checkbox,
    FormControlLabel,
    IconButton,
    InputAdornment,
    Link,
    TextField,
    Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { Link as RouterLink } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    loginDefaultValues,
    loginSchema,
    type LoginFormValues,
} from "../model/loginForm";

import { routePaths } from "@shared/config";
import { fieldHelper } from "@shared/lib/form";
import { FormWrapper } from "@shared/ui/FormWrapper";

const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: loginDefaultValues,
        mode: "onBlur",
    });

    const onSubmit = (data: LoginFormValues) => {
        void data;
        // TODO: implement login logic
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
                    disabled={isSubmitting}
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
    );
};

export default LoginPage;
