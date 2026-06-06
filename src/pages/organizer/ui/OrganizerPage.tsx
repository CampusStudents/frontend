import { Stack } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useParams } from "react-router-dom";

import { OrganizerEventsSection } from "./OrganizerEventsSection";
import { OrganizerProfileCard } from "./OrganizerProfileCard";

import { getOrganization, getOrganizationQueryKey } from "@shared/api/liveApi";
import { time } from "@shared/lib/time";
import { EmptyState } from "@shared/ui/EmptyState";
import { ErrorFallback } from "@shared/ui/ErrorFallback";
import { Loader } from "@shared/ui/Loader";

const OrganizerPage = () => {
    const { id: organizationId } = useParams<{ id: string }>();
    const {
        data: organization,
        isLoading,
        error,
        refetch,
    } = useQuery({
        queryKey: getOrganizationQueryKey(organizationId),
        queryFn: ({ signal }) => getOrganization(organizationId ?? "", signal),
        enabled: Boolean(organizationId),
        staleTime: time.m(5),
    });

    if (!organizationId) {
        return (
            <EmptyState
                title="Организатор не найден"
                description="В адресе нет идентификатора организатора."
            />
        );
    }

    if (isLoading) {
        return <Loader />;
    }

    if (error) {
        return (
            <ErrorFallback
                title="Не удалось загрузить организатора"
                description="Страница организатора сейчас недоступна. Попробуйте обновить данные."
                error={error as AxiosError}
                onRetry={() => {
                    void refetch();
                }}
            />
        );
    }

    return (
        <Stack spacing={4}>
            <OrganizerProfileCard
                name={organization?.name}
                description={organization?.description}
                contactEmail={organization?.contact_email}
                imageUrl={organization?.images?.[0]?.url}
            />
            <OrganizerEventsSection organizerId={organizationId} />
        </Stack>
    );
};

export default OrganizerPage;
