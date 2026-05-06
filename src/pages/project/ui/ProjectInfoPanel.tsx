import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import type { ProjectDetails } from "../model/types";
import type {
    ProjectLoginPromptContent,
    ProjectLoginPromptVariant,
} from "../model/uiTypes";

import ProjectApplicationModal from "./ProjectApplicationModal";
import ProjectInfoPanelCard from "./ProjectInfoPanelCard";

import { tokenStorage } from "@shared/lib/auth";
import { AuthRequiredDialog } from "@shared/ui/AuthRequiredDialog";
import { StatusToast } from "@shared/ui/StatusToast";
import type { StatusToastData } from "@shared/ui/StatusToast";

type ProjectInfoPanelProps = {
    details: ProjectDetails;
};

const ProjectInfoPanel = ({ details }: ProjectInfoPanelProps) => {
    const isAuthenticated = Boolean(tokenStorage.get());
    const [isApplicationOpen, setIsApplicationOpen] = useState(false);
    const [applicationMessage, setApplicationMessage] = useState("");
    const [isToastOpen, setIsToastOpen] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);
    const [loginPromptVariant, setLoginPromptVariant] =
        useState<ProjectLoginPromptVariant>(null);
    const [toastData, setToastData] = useState<StatusToastData>({
        title: details.venue,
        message: "Заявка отправлена успешно!",
    });

    useEffect(() => {
        if (!isToastOpen) {
            return;
        }

        const timeoutId = window.setTimeout(() => {
            setIsToastOpen(false);
        }, 3000);

        return () => window.clearTimeout(timeoutId);
    }, [isToastOpen]);

    const openToast = (title: string, message: string) => {
        setToastData({ title, message });
        setIsToastOpen(false);

        window.setTimeout(() => {
            setIsToastOpen(true);
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
                          <AuthRequiredDialog
                              open={loginPromptVariant !== null}
                              onClose={() => setLoginPromptVariant(null)}
                              title={loginPromptContent?.title ?? ""}
                              description={
                                  loginPromptContent?.description ?? ""
                              }
                          />
                          <StatusToast
                              open={isToastOpen}
                              title={toastData.title}
                              message={toastData.message}
                              onClose={() => setIsToastOpen(false)}
                          />
                      </>,
                      document.body,
                  )
                : null}
        </>
    );
};

export default ProjectInfoPanel;
