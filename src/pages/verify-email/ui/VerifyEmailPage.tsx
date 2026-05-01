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
import {
    Link as RouterLink,
    useNavigate,
    useSearchParams,
} from "react-router-dom";

import { useAuthVerifyAccount } from "@shared/api";
import { routePaths } from "@shared/config";

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
            navigate(routePaths.home);
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
                <Alert severity="success" variant="outlined">
                    Email успешно подтверждён. Перенаправляем на главную...
                </Alert>
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
                py: 4,
            }}
        >
            <Paper
                elevation={0}
                sx={{
                    width: "100%",
                    maxWidth: 520,
                    p: { xs: 3, sm: 5 },
                    borderRadius: 4,
                    border: 1,
                    borderColor: "divider",
                    boxShadow: "0 20px 60px rgba(19, 21, 23, 0.06)",
                    textAlign: "center",
                }}
            >
                <Stack spacing={2.5} alignItems="center">
                    <Typography
                        variant="h6"
                        component="h1"
                        sx={{ fontWeight: 700 }}
                    >
                        Подтверждение email
                    </Typography>

                    <Box sx={{ width: "100%" }}>{renderContent()}</Box>

                    {(isSuccess || isError || !token) && (
                        <Button
                            component={RouterLink}
                            to={routePaths.home}
                            variant="contained"
                            sx={{ textTransform: "none", fontWeight: 600 }}
                        >
                            На главную
                        </Button>
                    )}
                </Stack>
            </Paper>
        </Container>
    );
};

export default VerifyEmailPage;
