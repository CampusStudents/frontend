import { ArrowForwardRounded, EventRounded } from "@mui/icons-material";
import { Stack, Typography } from "@mui/material";
import { generatePath, Link as RouterLink } from "react-router-dom";

import { routePaths } from "@shared/config";

type ProjectCardEventRowProps = {
    eventId: string | null;
    eventTitle: string;
    onNavigate?: () => void;
};

const ProjectCardEventRow = ({
    eventId,
    eventTitle,
    onNavigate,
}: ProjectCardEventRowProps) => {
    const hasLinkedEvent = Boolean(eventId);

    return (
        <Stack spacing={0.5}>
            <Stack direction="row" spacing={0.5} alignItems="center">
                <EventRounded
                    sx={{
                        fontSize: 16,
                        color: "text.secondary",
                        flexShrink: 0,
                    }}
                />
                <Typography
                    variant="caption"
                    sx={{
                        color: "text.secondary",
                        fontWeight: 600,
                        letterSpacing: 0.4,
                        textTransform: "uppercase",
                        fontSize: { xs: 11, sm: 12 },
                    }}
                >
                    Мероприятие
                </Typography>
            </Stack>

            <Stack
                direction="row"
                spacing={0.75}
                alignItems="center"
                sx={{ minWidth: 0 }}
            >
                <ArrowForwardRounded
                    sx={{
                        color: "text.primary",
                        fontSize: { xs: 18, md: 22 },
                        flexShrink: 0,
                        display: { xs: "none", sm: "block" },
                    }}
                />
                {hasLinkedEvent ? (
                    <Typography
                        component={RouterLink}
                        to={generatePath(routePaths.event, {
                            id: String(eventId),
                        })}
                        onClick={(event) => {
                            event.stopPropagation();
                            onNavigate?.();
                        }}
                        sx={{
                            fontSize: { xs: 16, sm: 18, md: 22 },
                            fontWeight: 500,
                            lineHeight: 1.25,
                            color: "primary.main",
                            textDecoration: "none",
                            wordBreak: "break-word",
                            "&:hover": {
                                textDecoration: "underline",
                            },
                        }}
                    >
                        {eventTitle}
                    </Typography>
                ) : (
                    <Typography
                        sx={{
                            fontSize: { xs: 16, sm: 18, md: 22 },
                            fontWeight: 500,
                            lineHeight: 1.25,
                            color: "text.disabled",
                            wordBreak: "break-word",
                        }}
                    >
                        {eventTitle}
                    </Typography>
                )}
            </Stack>
        </Stack>
    );
};

export default ProjectCardEventRow;
