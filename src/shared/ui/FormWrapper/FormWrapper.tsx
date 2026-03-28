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
                    boxShadow: "0 20px 60px rgba(19, 21, 23, 0.06)",
                }}
            >
                {renderTitle && (
                    <Typography
                        variant="h6"
                        component="h1"
                        sx={{ fontWeight: 700, textAlign: "center", mb: 1 }}
                    >
                        {renderTitle()}
                    </Typography>
                )}

                {renderDescription && (
                    <Box
                        sx={{
                            mb: 2,
                        }}
                    >
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{
                                textAlign: "center",
                                maxWidth: 420,
                                mx: "auto",
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
                            gap: 0.75,
                            "& .MuiFormControl-root": {
                                width: "100%",
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
                                mt: 2,
                                "& .MuiButton-root": {
                                    textTransform: "none",
                                    fontWeight: 600,
                                },
                            }}
                        >
                            {renderSubmit()}
                        </Box>
                    )}

                    {renderFooter && (
                        <Box sx={{ textAlign: "center", mt: 2 }}>
                            {renderFooter()}
                        </Box>
                    )}
                </Box>
            </Paper>
        </Container>
    );
};

export default FormWrapper;
