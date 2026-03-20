/**
 * @example
 * <FormWrapper onSubmit={handleSubmit}>
 *     <FormWrapper.Title>Регистрация</FormWrapper.Title>
 *     <FormWrapper.Actions>
 *         <ToggleButtonGroup value={role} exclusive onChange={handleRole}>
 *             <ToggleButton value="participant">Участник</ToggleButton>
 *             <ToggleButton value="organizer">Организатор</ToggleButton>
 *         </ToggleButtonGroup>
 *     </FormWrapper.Actions>
 *     <FormWrapper.Fields>
 *         <TextField label="Email" />
 *         <TextField label="Пароль" type="password" />
 *     </FormWrapper.Fields>
 *     <FormWrapper.Submit>
 *         <Button type="submit" variant="contained" fullWidth>Войти</Button>
 *     </FormWrapper.Submit>
 *     <FormWrapper.Footer>
 *         <Typography>Нет аккаунта? <Link to="/register">Регистрация</Link></Typography>
 *     </FormWrapper.Footer>
 * </FormWrapper>
 */
import { Container, Paper, Typography, Box } from "@mui/material";
import React from "react";

interface FormWrapperProps {
    onSubmit: React.ComponentPropsWithoutRef<"form">["onSubmit"];
    children: React.ReactNode;
}

interface FormWrapperSlotProps {
    children: React.ReactNode;
}

type FormWrapperComponent = React.FC<FormWrapperProps> & {
    Title: React.FC<FormWrapperSlotProps>;
    Actions: React.FC<FormWrapperSlotProps>;
    Fields: React.FC<FormWrapperSlotProps>;
    Submit: React.FC<FormWrapperSlotProps>;
    Footer: React.FC<FormWrapperSlotProps>;
};

const FormWrapper = (({ onSubmit, children }) => {
    const childrenArray = React.Children.toArray(children);

    const titleNode = childrenArray.find(
        (child) =>
            React.isValidElement(child) && child.type === FormWrapper.Title,
    );

    const actionsNode = childrenArray.find(
        (child) =>
            React.isValidElement(child) && child.type === FormWrapper.Actions,
    );

    const fieldsNode = childrenArray.find(
        (child) =>
            React.isValidElement(child) && child.type === FormWrapper.Fields,
    );

    const submitNode = childrenArray.find(
        (child) =>
            React.isValidElement(child) && child.type === FormWrapper.Submit,
    );

    const footerNode = childrenArray.find(
        (child) =>
            React.isValidElement(child) && child.type === FormWrapper.Footer,
    );

    return (
        <Container
            maxWidth="sm"
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh",
                py: 4,
            }}
        >
            <Paper
                elevation={0}
                sx={{
                    width: "100%",
                    maxWidth: 580,
                    p: { xs: 3, sm: 5 },
                    borderRadius: 4,
                    border: 1,
                    borderColor: "divider",
                }}
            >
                {titleNode}

                {actionsNode}

                <Box
                    component="form"
                    onSubmit={onSubmit}
                    sx={{ display: "flex", flexDirection: "column" }}
                >
                    {fieldsNode}
                    {submitNode}
                    {footerNode}
                </Box>
            </Paper>
        </Container>
    );
}) as FormWrapperComponent;

FormWrapper.Title = ({ children }) => {
    return (
        <Typography
            variant="h5"
            component="h1"
            sx={{ fontWeight: 700, textAlign: "center", mb: 3 }}
        >
            {children}
        </Typography>
    );
};

FormWrapper.Actions = ({ children }) => {
    return (
        <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
            {children}
        </Box>
    );
};

FormWrapper.Fields = ({ children }) => {
    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {children}
        </Box>
    );
};

FormWrapper.Submit = ({ children }) => {
    return (
        <Box
            sx={{
                mt: 1,
                "& .MuiButton-root": {
                    borderRadius: "borderRadiusPillSmall",
                    py: 1.5,
                    textTransform: "none",
                    fontWeight: 600,
                    fontSize: "1rem",
                },
            }}
        >
            {children}
        </Box>
    );
};

FormWrapper.Footer = ({ children }) => {
    return <Box sx={{ textAlign: "center", mt: 0.5 }}>{children}</Box>;
};

export default FormWrapper;
