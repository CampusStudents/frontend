import { Box, Stack, Typography } from "@mui/material";

import { organizerEvents } from "../model/mockData";

import { EventCard } from "./EventCard";

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
        </Stack>
    );
};
