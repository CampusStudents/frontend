import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import type { ProjectDetails } from "../model/types";
import type {
    ProjectLoginPromptContent,
    ProjectLoginPromptVariant,
    ProjectToastData,
    ProjectToastState,
} from "../model/uiTypes";

import ProjectApplicationModal from "./ProjectApplicationModal";
import ProjectInfoPanelCard from "./ProjectInfoPanelCard";
import ProjectLoginPrompt from "./ProjectLoginPrompt";
import ProjectToast from "./ProjectToast";

import { tokenStorage } from "@shared/lib/auth";

type ProjectInfoPanelProps = {
    details: ProjectDetails;
};

const ProjectInfoPanel = ({ details }: ProjectInfoPanelProps) => {
    const isAuthenticated = Boolean(tokenStorage.get());
    const [isApplicationOpen, setIsApplicationOpen] = useState(false);
    const [applicationMessage, setApplicationMessage] = useState("");
    const [toastState, setToastState] = useState<ProjectToastState>("closed");
    const [isFavorite, setIsFavorite] = useState(false);
    const [loginPromptVariant, setLoginPromptVariant] =
        useState<ProjectLoginPromptVariant>(null);
    const [toastData, setToastData] = useState<ProjectToastData>({
        title: details.venue,
        message: "Заявка отправлена успешно!",
    });

    useEffect(() => {
        if (toastState !== "open") {
            return;
        }

        const timeoutId = window.setTimeout(() => {
            setToastState("closing");
        }, 3000);

        return () => window.clearTimeout(timeoutId);
    }, [toastState]);

    useEffect(() => {
        if (toastState !== "closing") {
            return;
        }

        const timeoutId = window.setTimeout(() => {
            setToastState("closed");
        }, 240);

        return () => window.clearTimeout(timeoutId);
    }, [toastState]);

    const openToast = (title: string, message: string) => {
        setToastData({ title, message });
        setToastState("closed");

        window.setTimeout(() => {
            setToastState("open");
        }, 0);
    };

    const handleSubmitApplication = () => {
        setIsApplicationOpen(false);
        openToast(details.venue, "Заявка отправлена успешно!");
        setApplicationMessage("");
    };

    const handleApplicationClick = () => {
        if (!isAuthenticated) {
            setLoginPromptVariant("participation");
            return;
        }

        setIsApplicationOpen(true);
    };

    const handleAddToFavorites = () => {
        if (!isAuthenticated) {
            setLoginPromptVariant("favorites");
            return;
        }

        if (isFavorite) {
            return;
        }

        setIsFavorite(true);
        openToast(details.title, "Проект добавлен в избранное!");
    };

    const loginPromptContent: ProjectLoginPromptContent | null =
        loginPromptVariant === "participation"
            ? {
                  title: "Нужно войти в аккаунт",
                  description:
                      "Чтобы отметить участие в проекте, нужно войти в аккаунт.",
              }
            : loginPromptVariant === "favorites"
              ? {
                    title: "Нужно войти в аккаунт",
                    description:
                        "Чтобы добавить проект в избранное, нужно войти в аккаунт.",
                }
              : null;

    return (
        <>
            <ProjectInfoPanelCard
                details={details}
                isFavorite={isFavorite}
                onApply={handleApplicationClick}
                onToggleFavorite={handleAddToFavorites}
            />

            {typeof document !== "undefined"
                ? createPortal(
                      <>
                          <ProjectApplicationModal
                              open={isApplicationOpen}
                              message={applicationMessage}
                              onClose={() => setIsApplicationOpen(false)}
                              onMessageChange={setApplicationMessage}
                              onSubmit={handleSubmitApplication}
                          />
                          <ProjectLoginPrompt
                              content={loginPromptContent}
                              open={loginPromptVariant !== null}
                              onClose={() => setLoginPromptVariant(null)}
                          />
                          <ProjectToast
                              state={toastState}
                              data={toastData}
                              onClose={() => setToastState("closing")}
                          />
                      </>,
                      document.body,
                  )
                : null}
        </>
    );
};

export default ProjectInfoPanel;
