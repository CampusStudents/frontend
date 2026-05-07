import { Paper, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { eventDetails } from "../model/mockData";
import type { LoginPromptContent, LoginPromptVariant } from "../model/uiTypes";

import EventContentSection from "./EventContentSection";
import EventHeaderSection from "./EventHeaderSection";
import EventSidebar from "./EventSidebar";

import { tokenStorage } from "@shared/lib/auth";
import { routePaths } from "@shared/config";
import { AuthRequiredDialog } from "@shared/ui/AuthRequiredDialog";
import { StatusToast } from "@shared/ui/StatusToast";
import type { StatusToastData } from "@shared/ui/StatusToast";

const EventPage = () => {
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

        navigate(routePaths.createProject);
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
            eventDetails.organizerName,
            "Вы подписались на обновления мероприятия!",
        );
    };

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
                    <EventHeaderSection details={eventDetails} />

                    <Stack
                        direction={{ xs: "column", lg: "row" }}
                        spacing={{ xs: 3, lg: 4.5 }}
                        alignItems="flex-start"
                    >
                        <EventSidebar
                            details={eventDetails}
                            isSubscribed={isSubscribed}
                            onSubscribe={handleSubscribe}
                        />
                        <EventContentSection
                            details={eventDetails}
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
