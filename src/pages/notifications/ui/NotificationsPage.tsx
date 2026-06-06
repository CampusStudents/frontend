import { useMutation, useQuery } from "@tanstack/react-query";
import { Paper, Stack, Typography } from "@mui/material";
import type { AxiosError } from "axios";

import {
    getNotifications,
    getNotificationsQueryKey,
    markNotificationAsRead,
} from "@shared/api/liveApi";
import { queryClient } from "@shared/api";
import { time } from "@shared/lib/time";
import { EmptyState } from "@shared/ui/EmptyState";
import { ErrorFallback } from "@shared/ui/ErrorFallback";
import { Loader } from "@shared/ui/Loader";

const formatNotificationTime = (value: string) => {
    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return "";
    }

    return new Intl.DateTimeFormat("ru-RU", {
        day: "numeric",
        month: "long",
        hour: "2-digit",
        minute: "2-digit",
    }).format(date);
};

const NotificationsPage = () => {
    const {
        data: notifications = [],
        isLoading,
        error,
        refetch,
    } = useQuery({
        queryKey: getNotificationsQueryKey(),
        queryFn: ({ signal }) => getNotifications(signal),
        staleTime: time.m(2),
    });

    const markAsReadMutation = useMutation({
        mutationFn: markNotificationAsRead,
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: getNotificationsQueryKey(),
            });
        },
    });

    if (isLoading) {
        return <Loader />;
    }

    if (error) {
        return (
            <ErrorFallback
                title="Не удалось загрузить уведомления"
                description="Уведомления сейчас недоступны. Попробуйте обновить страницу."
                error={error as AxiosError}
                onRetry={() => {
                    void refetch();
                }}
            />
        );
    }

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
                        Все важные обновления по заявкам и проектам.
                    </Typography>
                </Stack>
            </Paper>

            {notifications.length > 0 ? (
                <Stack spacing={0}>
                    {notifications.map((item) => {
                        const unread = !item.read_at;

                        return (
                            <Paper
                                key={item.id}
                                elevation={0}
                                onClick={() => {
                                    if (!unread) {
                                        return;
                                    }

                                    markAsReadMutation.mutate(item.id);
                                }}
                                sx={{
                                    px: 0,
                                    py: 2.25,
                                    borderRadius: 0,
                                    borderBottom: "1px solid",
                                    borderColor: "divider",
                                    bgcolor: "transparent",
                                    cursor: unread ? "pointer" : "default",
                                }}
                            >
                                <Stack spacing={0.75}>
                                    <Typography
                                        sx={{
                                            fontSize: 18,
                                            fontWeight: unread ? 600 : 500,
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
                                        {item.body}
                                    </Typography>
                                    <Typography
                                        sx={{
                                            color: "text.secondary",
                                            fontSize: 14,
                                        }}
                                    >
                                        {formatNotificationTime(
                                            item.created_at,
                                        )}
                                    </Typography>
                                </Stack>
                            </Paper>
                        );
                    })}
                </Stack>
            ) : (
                <EmptyState
                    title="Уведомлений пока нет"
                    description="Когда по заявкам и проектам появятся обновления, они будут здесь."
                />
            )}
        </Stack>
    );
};

export default NotificationsPage;
