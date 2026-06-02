import { useQueries } from "@tanstack/react-query";
import { Paper, Stack, Typography } from "@mui/material";
import type { AxiosError } from "axios";
import { useParams } from "react-router-dom";

import { CandidateCard } from "@entities/project";
import type { CandidatesCardData } from "@entities/project";
import {
    getProjectsGetProjectVacancyApplicationsQueryKey,
    projectsGetProjectVacancyApplications,
    queryClient,
    useProjectsDecideApplication,
    useProjectsGetProjectVacancies,
} from "@shared/api";
import type { ApplicationDTO } from "@shared/api/generated/model";
import { ApplicationDecisionSchemaStatus } from "@shared/api/generated/model";
import { EmptyState } from "@shared/ui/EmptyState";
import { ErrorFallback } from "@shared/ui/ErrorFallback";
import { Loader } from "@shared/ui/Loader";
import { ContentFindFilters } from "@widgets/ContentFilters";

type CandidateListItem = {
    application: ApplicationDTO;
    card: CandidatesCardData;
    tags: string[];
};

const applicationStatusLabels: Record<ApplicationDTO["status"], string> = {
    accepted: "Принята",
    pending: "На рассмотрении",
    rejected: "Отклонена",
    withdrawn: "Отозвана",
};

const mapApplicationToCandidate = (
    application: ApplicationDTO,
): CandidateListItem => {
    const profile = application.applicant.profile;
    const name = profile
        ? `${profile.first_name} ${profile.last_name}`.trim()
        : application.applicant.email;
    const role = application.vacancy.team_role.name;

    return {
        application,
        card: {
            id: application.id,
            name,
            about:
                application.cover_letter?.trim() ||
                "Кандидат не добавил сопроводительное письмо.",
            city: application.applicant.email,
            role,
            status: applicationStatusLabels[application.status],
        },
        tags: [role],
    };
};

const CandidatesPage = () => {
    const { id: projectId } = useParams<{ id: string }>();
    const {
        data: vacanciesResponse,
        isLoading: isVacanciesLoading,
        error: vacanciesError,
        refetch: refetchVacancies,
    } = useProjectsGetProjectVacancies(projectId ?? "", undefined, {
        query: {
            enabled: Boolean(projectId),
        },
    });
    const vacancies = vacanciesResponse ?? [];
    const applicationsQueries = useQueries({
        queries: vacancies.map((vacancy) => ({
            queryKey: getProjectsGetProjectVacancyApplicationsQueryKey(
                projectId,
                vacancy.id,
            ),
            queryFn: ({ signal }: { signal: AbortSignal }) =>
                projectsGetProjectVacancyApplications(
                    projectId ?? "",
                    vacancy.id,
                    signal,
                ),
            enabled: Boolean(projectId),
        })),
    });
    const decideApplicationMutation = useProjectsDecideApplication();

    const applications = applicationsQueries.flatMap(
        (query) => query.data ?? [],
    );
    const candidateItems = applications.map(mapApplicationToCandidate);
    const isApplicationsLoading = applicationsQueries.some(
        (query) => query.isLoading,
    );
    const applicationsError = applicationsQueries.find(
        (query) => query.error,
    )?.error;

    const handleDecide = async (
        application: ApplicationDTO,
        status: ApplicationDecisionSchemaStatus,
    ) => {
        await decideApplicationMutation.mutateAsync({
            projectId: application.vacancy.project_id,
            vacancyId: application.vacancy_id,
            applicationId: application.id,
            data: { status },
        });
        await queryClient.invalidateQueries({
            queryKey: getProjectsGetProjectVacancyApplicationsQueryKey(
                application.vacancy.project_id,
                application.vacancy_id,
            ),
        });
    };

    if (!projectId) {
        return (
            <EmptyState
                title="Проект не найден"
                description="В адресе отсутствует идентификатор проекта."
            />
        );
    }

    if (isVacanciesLoading || isApplicationsLoading) {
        return <Loader />;
    }

    if (vacanciesError || applicationsError) {
        return (
            <ErrorFallback
                title="Не удалось загрузить кандидатов"
                description="Список заявок сейчас недоступен. Попробуйте обновить данные."
                error={(vacanciesError ?? applicationsError) as AxiosError}
                onRetry={() => {
                    void refetchVacancies();
                    void Promise.all(
                        applicationsQueries.map((query) => query.refetch()),
                    );
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
                        Кандидаты
                    </Typography>
                </Stack>
            </Paper>

            <ContentFindFilters />

            {candidateItems.length > 0 ? (
                <Stack spacing={3}>
                    {candidateItems.map(({ application, card, tags }) => (
                        <CandidateCard
                            key={card.id}
                            card={card}
                            tags={tags}
                            isPending={decideApplicationMutation.isPending}
                            onAccept={() =>
                                void handleDecide(
                                    application,
                                    ApplicationDecisionSchemaStatus.accepted,
                                )
                            }
                            onReject={() =>
                                void handleDecide(
                                    application,
                                    ApplicationDecisionSchemaStatus.rejected,
                                )
                            }
                        />
                    ))}
                </Stack>
            ) : (
                <EmptyState
                    title="Пока нет кандидатов"
                    description="Когда участники начнут откликаться на вакансии проекта, они появятся здесь."
                />
            )}
        </Stack>
    );
};

export default CandidatesPage;
