import { useState } from "react";
import {
    Button,
    IconButton,
    InputAdornment,
    Link,
    MenuItem,
    TextField,
    ToggleButton,
    ToggleButtonGroup,
    Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { Link as RouterLink } from "react-router-dom";

import {
    registerDefaultValues,
    registerResolver,
    type RegisterFormValues,
} from "../model/registerForm";

import { routePaths } from "@shared/config";
import { fieldHelper } from "@shared/lib/form";
import { FormWrapper } from "@shared/ui/FormWrapper";

type Role = "participant" | "organizer";

const RegisterPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm<RegisterFormValues>({
        resolver: registerResolver,
        defaultValues: registerDefaultValues,
        mode: "onBlur",
    });

    const role = watch("role");

    const onSubmit = (data: RegisterFormValues) => {
        void data;
        // TODO: implement registration logic
    };

    const renderPasswordIcon = (isVisible: boolean, toggle: () => void) => (
        <InputAdornment position="end">
            <IconButton onClick={toggle} edge="end" size="small">
                {isVisible ? <Visibility /> : <VisibilityOff />}
            </IconButton>
        </InputAdornment>
    );

    const renderActions = () => (
        <ToggleButtonGroup
            value={role}
            exclusive
            onChange={(_, newRole: Role | null) => {
                if (newRole !== null) {
                    setValue("role", newRole, {
                        shouldValidate: true,
                        shouldDirty: true,
                    });
                }
            }}
            size="small"
        >
            <ToggleButton value="participant">Участник</ToggleButton>
            <ToggleButton value="organizer">Организатор</ToggleButton>
        </ToggleButtonGroup>
    );

    const renderForm = () => {
        const { ref: emailRef, ...email } = register("email");
        const { ref: fullNameRef, ...fullName } = register("fullName");
        const { ref: genderRef, ...gender } = register("gender");
        const { ref: ageRef, ...age } = register("age");
        const { ref: cityRef, ...city } = register("city");
        const { ref: passwordRef, ...password } = register("password");
        const { ref: confirmPasswordRef, ...confirmPassword } =
            register("confirmPassword");

        return (
            <>
                <TextField
                    {...email}
                    inputRef={emailRef}
                    fullWidth
                    label="Email"
                    type="email"
                    error={Boolean(errors.email)}
                    helperText={fieldHelper(errors.email?.message)}
                />

                <TextField
                    {...fullName}
                    inputRef={fullNameRef}
                    fullWidth
                    label="ФИО"
                    error={Boolean(errors.fullName)}
                    helperText={fieldHelper(errors.fullName?.message)}
                />

                <TextField
                    {...gender}
                    inputRef={genderRef}
                    fullWidth
                    select
                    label="Пол"
                    error={Boolean(errors.gender)}
                    helperText={fieldHelper(errors.gender?.message)}
                >
                    <MenuItem value="">Не выбран</MenuItem>
                    <MenuItem value="male">Мужской</MenuItem>
                    <MenuItem value="female">Женский</MenuItem>
                </TextField>

                <TextField
                    {...age}
                    inputRef={ageRef}
                    fullWidth
                    label="Возраст"
                    type="number"
                    error={Boolean(errors.age)}
                    helperText={fieldHelper(errors.age?.message)}
                />

                <TextField
                    {...city}
                    inputRef={cityRef}
                    fullWidth
                    label="Город"
                    error={Boolean(errors.city)}
                    helperText={fieldHelper(errors.city?.message)}
                />

                <TextField
                    {...password}
                    inputRef={passwordRef}
                    fullWidth
                    label="Пароль"
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
            renderActions={renderActions}
            renderFields={renderForm}
            renderSubmit={() => (
                <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    sx={{ minHeight: 46 }}
                    disabled={isSubmitting}
                >
                    Зарегистрироваться
                </Button>
            )}
            renderFooter={() => (
                <Typography color="grey.500">
                    Уже есть аккаунт?{" "}
                    <Link
                        component={RouterLink}
                        to={routePaths.login}
                        underline="hover"
                    >
                        Войти
                    </Link>
                </Typography>
            )}
        />
    );
};

export default RegisterPage;
