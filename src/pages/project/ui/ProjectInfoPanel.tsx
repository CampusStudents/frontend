import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import type { ProjectDetails, ProjectRequirement } from "../model/types";
import type {
    ProjectLoginPromptContent,
    ProjectLoginPromptVariant,
} from "../model/uiTypes";

import ProjectApplicationModal from "./ProjectApplicationModal";
import ProjectInfoPanelCard from "./ProjectInfoPanelCard";

import {
    getApplicationsGetMyApplicationsQueryKey,
    queryClient,
    useProjectsCreateApplication,
} from "@shared/api";
import { tokenStorage } from "@shared/lib/auth";
import { AuthRequiredDialog } from "@shared/ui/AuthRequiredDialog";
import { StatusToast } from "@shared/ui/StatusToast";
import type { StatusToastData } from "@shared/ui/StatusToast";

type ProjectInfoPanelProps = {
    details: ProjectDetails;
    projectId: string;
    requirements: ProjectRequirement[];
};

const ProjectInfoPanel = ({
    details,
    projectId,
    requirements,
}: ProjectInfoPanelProps) => {
    const isAuthenticated = Boolean(tokenStorage.get());
    const [isApplicationOpen, setIsApplicationOpen] = useState(false);
    const [applicationMessage, setApplicationMessage] = useState("");
    const [selectedVacancyId, setSelectedVacancyId] = useState("");
    const [isToastOpen, setIsToastOpen] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);
    const [loginPromptVariant, setLoginPromptVariant] =
        useState<ProjectLoginPromptVariant>(null);
    const [toastData, setToastData] = useState<StatusToastData>({
        title: details.venue,
        message: "Заявка отправлена успешно!",
    });
    const createApplicationMutation = useProjectsCreateApplication();

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

    const handleSubmitApplication = async () => {
        if (!selectedVacancyId) {
            return;
        }

        try {
            await createApplicationMutation.mutateAsync({
                projectId,
                vacancyId: selectedVacancyId,
                data: {
                    cover_letter: applicationMessage.trim() || null,
                },
            });
            await queryClient.invalidateQueries({
                queryKey: getApplicationsGetMyApplicationsQueryKey(),
            });
        } catch {
            openToast(
                details.title,
                "Не удалось отправить заявку.",
            );
            return;
        }

        setIsApplicationOpen(false);
        openToast(details.venue, "Заявка отправлена успешно!");
        setApplicationMessage("");
    };

    const handleApplicationClick = () => {
        if (!isAuthenticated) {
            setLoginPromptVariant("participation");
            return;
        }

        setSelectedVacancyId(
            selectedVacancyId || requirements[0]?.vacancyId || "",
        );
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
                              selectedVacancyId={selectedVacancyId}
                              vacancies={requirements.map((requirement) => ({
                                  id: requirement.vacancyId,
                                  title: requirement.title,
                              }))}
                              isSubmitting={createApplicationMutation.isPending}
                              onClose={() => setIsApplicationOpen(false)}
                              onMessageChange={setApplicationMessage}
                              onVacancyChange={setSelectedVacancyId}
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
