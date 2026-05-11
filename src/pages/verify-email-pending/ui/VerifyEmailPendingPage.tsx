import {
    Box,
    Button,
    Chip,
    Container,
    Paper,
    Stack,
    Typography,
} from "@mui/material";
import MarkEmailReadOutlinedIcon from "@mui/icons-material/MarkEmailReadOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { Link as RouterLink, useLocation } from "react-router-dom";

import { routePaths } from "@shared/config";

type VerifyEmailPendingState = { email?: string } | null;

const VerifyEmailPendingPage = () => {
    const location = useLocation();
    const state = location.state as VerifyEmailPendingState;
    const email = state?.email;

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
                    maxWidth: 560,
                    p: { xs: 3, sm: 5 },
                    borderRadius: 2.5,
                    border: 1,
                    borderColor: "divider",
                    boxShadow: "0 18px 50px rgba(19, 21, 23, 0.07)",
                    textAlign: "center",
                }}
            >
                <Stack spacing={2.5} alignItems="center">
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: 72,
                            height: 72,
                            borderRadius: "50%",
                            bgcolor: "primary.50",
                            color: "primary.main",
                        }}
                    >
                        <MarkEmailReadOutlinedIcon fontSize="large" />
                    </Box>

                    <Stack spacing={1} alignItems="center">
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
                            Подтвердите почту
                        </Typography>
                    </Stack>

                    <Typography color="text.secondary" sx={{ lineHeight: 1.6 }}>
                        Мы отправили письмо{email ? ` на ${email}` : ""}. После
                        перехода по ссылке сразу откроется заполнение профиля.
                    </Typography>

                    <Stack
                        direction="row"
                        spacing={1}
                        useFlexGap
                        flexWrap="wrap"
                    >
                        <Chip
                            icon={<MarkEmailReadOutlinedIcon />}
                            label="1. Подтвердить email"
                            color="primary"
                        />
                        <Chip
                            icon={<PersonOutlineOutlinedIcon />}
                            label="2. Заполнить профиль"
                            variant="outlined"
                        />
                    </Stack>

                    <Button
                        component={RouterLink}
                        to={routePaths.login}
                        variant="text"
                        sx={{ textTransform: "none", fontWeight: 700 }}
                    >
                        Уже подтвердили? Войти
                    </Button>
                </Stack>
            </Paper>
        </Container>
    );
};

export default VerifyEmailPendingPage;
