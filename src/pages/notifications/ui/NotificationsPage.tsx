import { Paper, Stack, Typography } from "@mui/material";

import { notificationItems } from "../model/mockData";

const NotificationsPage = () => {
    return (
        <Stack spacing={3}>
            <Paper
                elevation={0}
                sx={{
                    borderRadius: 2.5,
                    bgcolor: "transparent",
                }}
            >
                <Stack spacing={0.75}>
                    <Typography
                        sx={{
                            fontSize: { xs: 28, md: 34 },
                            fontWeight: 600,
                            lineHeight: 1.1,
                        }}
                    >
                        Уведомления
                    </Typography>
                    <Typography
                        sx={{
                            color: "text.secondary",
                            lineHeight: 1.6,
                        }}
                    >
                        Все важные обновления по заявкам, избранному и проектам.
                    </Typography>
                </Stack>
            </Paper>

            <Stack spacing={0}>
                {notificationItems.map((item) => (
                    <Paper
                        key={item.id}
                        elevation={0}
                        sx={{
                            px: 0,
                            py: 2.25,
                            borderRadius: 0,
                            borderBottom: "1px solid",
                            borderColor: "divider",
                            bgcolor: "transparent",
                        }}
                    >
                        <Stack spacing={0.75}>
                            <Typography
                                sx={{
                                    fontSize: 18,
                                    fontWeight: item.unread ? 600 : 500,
                                    lineHeight: 1.35,
                                }}
                            >
                                {item.title}
                            </Typography>
                            <Typography
                                sx={{
                                    color: "text.secondary",
                                    lineHeight: 1.6,
                                }}
                            >
                                {item.description}
                            </Typography>
                            <Typography
                                sx={{
                                    color: "text.secondary",
                                    fontSize: 14,
                                }}
                            >
                                {item.time}
                            </Typography>
                        </Stack>
                    </Paper>
                ))}
            </Stack>
        </Stack>
    );
};

export default NotificationsPage;
