import { Box, Stack, Typography } from "@mui/material";

import { organizerEvents } from "../model/mockData";

import { EventCard } from "./EventCard";

import { EmptyState } from "@shared/ui/EmptyState";

export const OrganizerEventsSection = () => {
    const firstEvent = organizerEvents[0];

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

            {organizerEvents.length > 0 ? (
                <>
                    <Typography
                        sx={{
                            fontWeight: 600,
                            color: "text.secondary",
                            fontSize: 24,
                        }}
                    >
                        <Box component="span" sx={{ color: "text.primary" }}>
                            {firstEvent?.date}
                        </Box>{" "}
                        {firstEvent?.weekday}
                    </Typography>

                    <Stack spacing={1.75}>
                        {organizerEvents.map((event) => (
                            <EventCard
                                key={event.id}
                                title={event.title}
                                description={event.description}
                            />
                        ))}
                    </Stack>
                </>
            ) : (
                <EmptyState
                    title="Пока афиша отдыхает"
                    description="Новых мероприятий еще нет. Похоже, организатор взял паузу на кофе и составление чего-то интересного."
                    sx={{
                        px: { xs: 2, md: 3 },
                        py: { xs: 3, md: 4 },
                    }}
                />
            )}
        </Stack>
    );
};
