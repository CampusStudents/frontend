import {
    Box,
    Button,
    Container,
    Paper,
    Stack,
    Typography,
} from "@mui/material";
import MarkEmailReadOutlinedIcon from "@mui/icons-material/MarkEmailReadOutlined";
import { Link as RouterLink } from "react-router-dom";

import { routePaths } from "@shared/config";

const VerifyEmailPendingPage = () => {
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
                <Stack spacing={2} alignItems="center">
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: 64,
                            height: 64,
                            borderRadius: "50%",
                            bgcolor: "primary.50",
                            color: "primary.main",
                        }}
                    >
                        <MarkEmailReadOutlinedIcon fontSize="large" />
                    </Box>

                    <Typography
                        variant="h6"
                        component="h1"
                        sx={{ fontWeight: 700 }}
                    >
                        Подтвердите email
                    </Typography>

                    <Typography color="text.secondary">
                        Перейдите, пожалуйста, на почту, чтобы подтвердить
                        email. Мы отправили вам письмо со ссылкой для активации
                        аккаунта.
                    </Typography>

                    <Button
                        component={RouterLink}
                        to={routePaths.home}
                        variant="text"
                        sx={{ textTransform: "none", fontWeight: 600 }}
                    >
                        Вернуться на главную
                    </Button>
                </Stack>
            </Paper>
        </Container>
    );
};

export default VerifyEmailPendingPage;
