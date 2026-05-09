/**
 * @example
 * <FormWrapper
 *     onSubmit={handleSubmit}
 *     renderTitle={() => "Регистрация"}
 *     renderActions={() => (
 *         <ToggleButtonGroup value={role} exclusive onChange={handleRole}>
 *             <ToggleButton value="participant">Участник</ToggleButton>
 *             <ToggleButton value="organizer">Организатор</ToggleButton>
 *         </ToggleButtonGroup>
 *     )}
 *     renderFields={() => (
 *         <>
 *             <TextField label="Email" />
 *             <TextField label="Пароль" type="password" />
 *         </>
 *     )}
 *     renderSubmit={() => (
 *         <Button type="submit" variant="contained" fullWidth>
 *             Войти
 *         </Button>
 *     )}
 *     renderFooter={() => (
 *         <Typography>Нет аккаунта? <Link to="/register">Регистрация</Link></Typography>
 *     )}
 * />
 */
import { Box, Container, Paper, Typography } from "@mui/material";

interface FormWrapperProps {
    onSubmit: React.ComponentPropsWithoutRef<"form">["onSubmit"];
    renderTitle?: () => React.ReactNode;
    renderDescription?: () => React.ReactNode;
    renderActions?: () => React.ReactNode;
    renderFields: () => React.ReactNode;
    renderSubmit?: () => React.ReactNode;
    renderFooter?: () => React.ReactNode;
}

const FormWrapper = ({
    onSubmit,
    renderTitle,
    renderDescription,
    renderActions,
    renderFields,
    renderSubmit,
    renderFooter,
}: FormWrapperProps) => {
    return (
        <Container
            maxWidth={false}
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh",
                px: { xs: 2, sm: 3 },
                py: { xs: 3, sm: 5 },
                bgcolor: "background.default",
            }}
        >
            <Paper
                elevation={0}
                sx={{
                    width: "100%",
                    maxWidth: 500,
                    p: { xs: 3, sm: 4.5 },
                    borderRadius: 2.5,
                    border: 1,
                    borderColor: "divider",
                    boxShadow: "0 18px 50px rgba(19, 21, 23, 0.07)",
                }}
            >
                <Typography
                    variant="overline"
                    color="primary"
                    sx={{
                        display: "block",
                        mb: 0.75,
                        fontWeight: 800,
                        lineHeight: 1,
                        letterSpacing: 0,
                        textTransform: "none",
                    }}
                >
                    campus
                </Typography>

                {renderTitle && (
                    <Typography
                        variant="h4"
                        component="h1"
                        sx={{
                            fontWeight: 800,
                            mb: 1,
                            fontSize: { xs: "2rem", sm: "2.25rem" },
                            lineHeight: 1.12,
                            letterSpacing: 0,
                        }}
                    >
                        {renderTitle()}
                    </Typography>
                )}

                {renderDescription && (
                    <Box
                        sx={{
                            mb: 3.25,
                        }}
                    >
                        <Typography
                            variant="body1"
                            color="text.secondary"
                            sx={{
                                maxWidth: 390,
                                lineHeight: 1.5,
                            }}
                        >
                            {renderDescription()}
                        </Typography>
                    </Box>
                )}

                {renderActions && (
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            mb: 2.5,
                            "& .MuiToggleButton-root": {
                                px: 1.5,
                                py: 0.5,
                                fontSize: "0.875rem",
                            },
                        }}
                    >
                        {renderActions()}
                    </Box>
                )}

                <Box
                    component="form"
                    onSubmit={onSubmit}
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        width: "100%",
                        alignItems: "stretch",
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 1.25,
                            "& .MuiFormControl-root": {
                                width: "100%",
                            },
                            "& .MuiInputBase-root": {
                                minHeight: 50,
                            },
                            "& .MuiFormHelperText-root": {
                                mt: 0.5,
                                fontSize: "0.75rem",
                                minHeight: "1.25rem",
                            },
                        }}
                    >
                        {renderFields()}
                    </Box>

                    {renderSubmit && (
                        <Box
                            sx={{
                                width: "100%",
                                mt: 2.25,
                                "& .MuiButton-root": {
                                    textTransform: "none",
                                    fontWeight: 700,
                                    minHeight: 50,
                                    borderRadius: 1.75,
                                    fontSize: "1rem",
                                },
                            }}
                        >
                            {renderSubmit()}
                        </Box>
                    )}

                    {renderFooter && (
                        <Box
                            sx={{
                                textAlign: "center",
                                mt: 2.25,
                                color: "text.secondary",
                            }}
                        >
                            {renderFooter()}
                        </Box>
                    )}
                </Box>
            </Paper>
        </Container>
    );
};

export default FormWrapper;
