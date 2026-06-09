import { Box, Stack, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

import { EventCard } from "./EventCard";

import { getEvents, getEventsQueryKey } from "@shared/api/liveApi";
import { time } from "@shared/lib/time";
import { EmptyState } from "@shared/ui/EmptyState";

type OrganizerEventsSectionProps = {
    organizerId: string;
};

const formatDate = (value: string) => {
    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return {
            date: "Дата не указана",
            weekday: "",
        };
    }

    return {
        date: new Intl.DateTimeFormat("ru-RU", {
            day: "numeric",
            month: "long",
        }).format(date),
        weekday: new Intl.DateTimeFormat("ru-RU", {
            weekday: "long",
        }).format(date),
    };
};

export const OrganizerEventsSection = ({
    organizerId,
}: OrganizerEventsSectionProps) => {
    const { data: events = [] } = useQuery({
        queryKey: [...getEventsQueryKey(), { organizerId }],
        queryFn: ({ signal }) =>
            getEvents({ organizer_id: [organizerId] }, signal),
        staleTime: time.m(5),
    });
    const firstEventDate = events[0] ? formatDate(events[0].date_start) : null;

    return (
        <Stack spacing={1.5}>
            <Typography
                sx={{
                    fontSize: { xs: 24, md: 30 },
                    fontWeight: 600,
                }}
            >
                Мероприятия
            </Typography>

            {events.length > 0 ? (
                <>
                    {firstEventDate ? (
                        <Typography
                            sx={{
                                fontWeight: 600,
                                color: "text.secondary",
                                fontSize: 24,
                                textTransform: "capitalize",
                            }}
                        >
                            <Box
                                component="span"
                                sx={{ color: "text.primary" }}
                            >
                                {firstEventDate.date}
                            </Box>{" "}
                            {firstEventDate.weekday}
                        </Typography>
                    ) : null}

                    <Stack spacing={1.75}>
                        {events.map((event) => (
                            <EventCard
                                key={event.id}
                                id={event.id}
                                title={event.title}
                                description={
                                    event.description?.trim() ||
                                    "Описание события пока пустое."
                                }
                            />
                        ))}
                    </Stack>
                </>
            ) : (
                <EmptyState
                    title="Мероприятий пока нет"
                    description="Когда организатор опубликует события, они появятся здесь."
                    sx={{
                        px: { xs: 2, md: 3 },
                        py: { xs: 3, md: 4 },
                    }}
                />
            )}
        </Stack>
    );
};
