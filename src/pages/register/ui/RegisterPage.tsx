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
import { Link as RouterLink } from "react-router-dom";

import { routePaths } from "@shared/config";
import { FormWrapper } from "@shared/ui/FormWrapper";

type Role = "participant" | "organizer";

const RegisterPage = () => {
    const [role, setRole] = useState<Role>("participant");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [email, setEmail] = useState("");
    const [fullName, setFullName] = useState("");
    const [gender, setGender] = useState("");
    const [age, setAge] = useState("");
    const [city, setCity] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleRoleChange = (
        _: React.MouseEvent<HTMLElement>,
        newRole: Role | null,
    ) => {
        // TODO: navigate to the corresponding form?
        if (newRole !== null) {
            setRole(newRole);
        }
    };

    const handleSubmit: React.ComponentPropsWithoutRef<"form">["onSubmit"] = (
        e,
    ) => {
        e.preventDefault();
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
            onChange={handleRoleChange}
            size="small"
        >
            <ToggleButton value="participant">Участник</ToggleButton>
            <ToggleButton value="organizer">Организатор</ToggleButton>
        </ToggleButtonGroup>
    );

    const renderForm = () => (
        <>
            <TextField
                fullWidth
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
                fullWidth
                label="ФИО"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
            />

            <TextField
                fullWidth
                select
                label="Пол"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
            >
                <MenuItem value="male">Мужской</MenuItem>
                <MenuItem value="female">Женский</MenuItem>
            </TextField>

            <TextField
                fullWidth
                label="Возраст"
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
            />

            <TextField
                fullWidth
                label="Город"
                value={city}
                onChange={(e) => setCity(e.target.value)}
            />

            <TextField
                fullWidth
                label="Пароль"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                slotProps={{
                    input: {
                        endAdornment: renderPasswordIcon(showPassword, () =>
                            setShowPassword(!showPassword),
                        ),
                    },
                }}
            />

            <TextField
                fullWidth
                label="Повторите пароль"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                slotProps={{
                    input: {
                        endAdornment: renderPasswordIcon(
                            showConfirmPassword,
                            () => setShowConfirmPassword(!showConfirmPassword),
                        ),
                    },
                }}
            />
        </>
    );

    return (
        <FormWrapper onSubmit={handleSubmit}>
            <FormWrapper.Title>Регистрация</FormWrapper.Title>
            <FormWrapper.Actions>{renderActions()}</FormWrapper.Actions>
            <FormWrapper.Fields>{renderForm()}</FormWrapper.Fields>
            <FormWrapper.Submit>
                <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    size="large"
                >
                    Зарегистрироваться
                </Button>
            </FormWrapper.Submit>
            <FormWrapper.Footer>
                <Typography color="grey.500">
                    Уже есть аккаунт?{" "}
                    <Link
                        component={RouterLink}
                        to={routePaths.home}
                        underline="hover"
                    >
                        Войти
                    </Link>
                </Typography>
            </FormWrapper.Footer>
        </FormWrapper>
    );
};

export default RegisterPage;
