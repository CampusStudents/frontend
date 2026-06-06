import { Paper, Stack } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { eventDetails } from "../model/mockData";
import type { EventDetails } from "../model/types";
import type { LoginPromptContent, LoginPromptVariant } from "../model/uiTypes";

import EventContentSection from "./EventContentSection";
import EventHeaderSection from "./EventHeaderSection";
import EventSidebar from "./EventSidebar";

import { getEvent, getEventQueryKey } from "@shared/api/liveApi";
import { routePaths } from "@shared/config";
import { tokenStorage } from "@shared/lib/auth";
import { time } from "@shared/lib/time";
import { AuthRequiredDialog } from "@shared/ui/AuthRequiredDialog";
import { EmptyState } from "@shared/ui/EmptyState";
import { ErrorFallback } from "@shared/ui/ErrorFallback";
import { Loader } from "@shared/ui/Loader";
import { StatusToast } from "@shared/ui/StatusToast";
import type { StatusToastData } from "@shared/ui/StatusToast";

const getEventDateParts = (value: string) => {
    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return {
            day: "--",
            month: "---",
            dateLabel: "Дата не указана",
        };
    }

    return {
        day: new Intl.DateTimeFormat("ru-RU", {
            day: "2-digit",
        }).format(date),
        month: new Intl.DateTimeFormat("ru-RU", {
            month: "short",
        })
            .format(date)
            .replace(".", ""),
        dateLabel: new Intl.DateTimeFormat("ru-RU", {
            weekday: "long",
            day: "numeric",
            month: "long",
        }).format(date),
    };
};

const getEventTime = (dateStart: string, dateEnd: string) => {
    const start = new Date(dateStart);
    const end = new Date(dateEnd);

    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
        return "";
    }

    const formatter = new Intl.DateTimeFormat("ru-RU", {
        hour: "2-digit",
        minute: "2-digit",
    });

    return `${formatter.format(start)} - ${formatter.format(end)}`;
};

const EventPage = () => {
    const { id: eventId } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const isAuthenticated = Boolean(tokenStorage.get());
    const [isToastOpen, setIsToastOpen] = useState(false);
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [loginPromptVariant, setLoginPromptVariant] =
        useState<LoginPromptVariant>(null);
    const [toastData, setToastData] = useState<StatusToastData>({
        title: eventDetails.locationName,
        message: "Заявка отправлена успешно!",
    });

    const {
        data: event,
        isLoading,
        error,
        refetch,
    } = useQuery({
        queryKey: getEventQueryKey(eventId),
        queryFn: ({ signal }) => getEvent(eventId ?? "", signal),
        enabled: Boolean(eventId),
        staleTime: time.m(5),
    });

    const details: EventDetails = event
        ? {
              ...eventDetails,
              ...getEventDateParts(event.date_start),
              id: event.id,
              organizerId: event.organizer_id ?? eventDetails.organizerId,
              title: event.title,
              timeLabel: getEventTime(event.date_start, event.date_end),
              locationName: event.format ?? "Формат не указан",
              address: event.registration_link ?? "Ссылка не указана",
              organizerName: event.organizer?.name ?? "Организатор",
              organizerDescription:
                  event.organizer?.contact_email ??
                  eventDetails.organizerDescription,
              description: [
                  event.description?.trim() || "Описание события пока пустое.",
              ],
              gallery: event.images?.map((image) => image.url) ?? [],
          }
        : eventDetails;

    const openToast = (title: string, message: string) => {
        setToastData({ title, message });
        setIsToastOpen(true);
    };

    useEffect(() => {
        if (!isToastOpen) {
            return;
        }

        const timeoutId = window.setTimeout(() => {
            setIsToastOpen(false);
        }, 3500);

        return () => window.clearTimeout(timeoutId);
    }, [isToastOpen]);

    const handleCreateProject = () => {
        if (!isAuthenticated) {
            setLoginPromptVariant("createProject");
            return;
        }

        navigate(`${routePaths.createProject}?eventId=${eventId}`);
    };

    const handleSubscribe = () => {
        if (!isAuthenticated) {
            setLoginPromptVariant("subscribe");
            return;
        }

        if (isSubscribed) {
            return;
        }

        setIsSubscribed(true);
        openToast(
            details.organizerName,
            "Вы подписались на обновления мероприятия!",
        );
    };

    if (!eventId) {
        return (
            <EmptyState
                title="Событие не найдено"
                description="В адресе нет идентификатора события."
            />
        );
    }

    if (isLoading) {
        return <Loader />;
    }

    if (error) {
        return (
            <ErrorFallback
                title="Не удалось загрузить событие"
                description="Событие сейчас недоступно. Попробуйте обновить данные."
                error={error as AxiosError}
                onRetry={() => {
                    void refetch();
                }}
            />
        );
    }

    const loginPromptContent: LoginPromptContent | null =
        loginPromptVariant === "createProject"
            ? {
                  title: "Нужно войти в аккаунт",
                  description:
                      "Чтобы создать проект по этому мероприятию, нужно войти в аккаунт.",
              }
            : loginPromptVariant === "subscribe"
              ? {
                    title: "Нужно войти в аккаунт",
                    description:
                        "Чтобы подписаться на обновления мероприятия, нужно войти в аккаунт.",
                }
              : null;

    return (
        <>
            <Paper
                elevation={0}
                sx={{
                    borderRadius: 2.5,
                    px: { xs: 2, md: 3 },
                    py: { xs: 2.5, md: 3 },
                }}
            >
                <Stack spacing={3}>
                    <EventHeaderSection details={details} />

                    <Stack
                        direction={{ xs: "column", lg: "row" }}
                        spacing={{ xs: 3, lg: 4.5 }}
                        alignItems="flex-start"
                    >
                        <EventSidebar
                            details={details}
                            isSubscribed={isSubscribed}
                            onSubscribe={handleSubscribe}
                        />
                        <EventContentSection
                            details={details}
                            onCreateProject={handleCreateProject}
                        />
                    </Stack>
                </Stack>
            </Paper>

            <AuthRequiredDialog
                open={loginPromptVariant !== null}
                onClose={() => setLoginPromptVariant(null)}
                title={loginPromptContent?.title ?? ""}
                description={loginPromptContent?.description ?? ""}
            />
            <StatusToast
                open={isToastOpen}
                title={toastData.title}
                message={toastData.message}
                onClose={() => setIsToastOpen(false)}
            />
        </>
    );
};

export default EventPage;
