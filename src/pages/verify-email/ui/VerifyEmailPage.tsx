import { useEffect } from "react";
import {
    Alert,
    Box,
    Button,
    CircularProgress,
    Container,
    Paper,
    Stack,
    Typography,
} from "@mui/material";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import {
    Link as RouterLink,
    useNavigate,
    useSearchParams,
} from "react-router-dom";

import { useAuthVerifyAccount } from "@shared/api";
import { routePaths } from "@shared/config";
import { tokenStorage } from "@shared/lib/auth";

const REDIRECT_DELAY_MS = 2000;

const VerifyEmailPage = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const token = searchParams.get("token") ?? "";

    const { isLoading, isSuccess, isError, error } = useAuthVerifyAccount({
        token,
    });

    useEffect(() => {
        if (!isSuccess) return;

        const timeoutId = setTimeout(() => {
            const nextPath = tokenStorage.get()
                ? routePaths.profileSetup
                : routePaths.login;

            navigate(nextPath, {
                replace: true,
                state: { emailVerified: true },
            });
        }, REDIRECT_DELAY_MS);

        return () => clearTimeout(timeoutId);
    }, [isSuccess, navigate]);

    const renderContent = () => {
        if (!token) {
            return (
                <Alert severity="error" variant="outlined">
                    Ссылка некорректна: в ней отсутствует токен подтверждения.
                </Alert>
            );
        }

        if (isLoading) {
            return (
                <Stack spacing={2} alignItems="center">
                    <CircularProgress />
                    <Typography color="text.secondary">
                        Подтверждаем email...
                    </Typography>
                </Stack>
            );
        }

        if (isError) {
            return (
                <Alert severity="error" variant="outlined">
                    Не удалось подтвердить email. Возможно, ссылка устарела.
                    {error instanceof Error ? ` (${error.message})` : null}
                </Alert>
            );
        }

        if (isSuccess) {
            return (
                <Stack spacing={2} alignItems="center">
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: 68,
                            height: 68,
                            borderRadius: "50%",
                            bgcolor: "success.light",
                            color: "success.contrastText",
                        }}
                    >
                        <CheckCircleOutlineOutlinedIcon fontSize="large" />
                    </Box>
                    <Alert
                        severity="success"
                        variant="outlined"
                        sx={{ width: "100%", textAlign: "left" }}
                    >
                        Email подтверждён. Открываем заполнение профиля...
                    </Alert>
                </Stack>
            );
        }

        return null;
    };

    return (
        <Container
            maxWidth="sm"
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh",
                px: { xs: 2, sm: 3 },
                py: 4,
                bgcolor: "background.default",
            }}
        >
            <Paper
                elevation={0}
                sx={{
                    width: "100%",
                    maxWidth: 520,
                    p: { xs: 3, sm: 5 },
                    borderRadius: 2.5,
                    border: 1,
                    borderColor: "divider",
                    boxShadow: "0 18px 50px rgba(19, 21, 23, 0.07)",
                    textAlign: "center",
                }}
            >
                <Stack spacing={2.5} alignItems="center">
                    <Typography
                        variant="overline"
                        color="primary"
                        sx={{
                            fontWeight: 800,
                            lineHeight: 1,
                            letterSpacing: 0,
                            textTransform: "none",
                        }}
                    >
                        campus
                    </Typography>
                    <Typography
                        variant="h4"
                        component="h1"
                        sx={{ fontWeight: 800, lineHeight: 1.12 }}
                    >
                        Подтверждение почты
                    </Typography>

                    <Box sx={{ width: "100%" }}>{renderContent()}</Box>

                    {(isError || !token) && (
                        <Button
                            component={RouterLink}
                            to={routePaths.register}
                            variant="contained"
                            sx={{ textTransform: "none", fontWeight: 700 }}
                        >
                            Вернуться к регистрации
                        </Button>
                    )}
                </Stack>
            </Paper>
        </Container>
    );
};

export default VerifyEmailPage;
