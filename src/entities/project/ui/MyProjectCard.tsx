import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

import { resolveMyCardEvent } from "../lib/resolveCardEvent";
import type { MyProjectCardData } from "../model/types";

import ProjectCardEventRow from "./ProjectCardEventRow";

type ProjectCardProps = {
    card: MyProjectCardData;
    candidatesTo?: string;
    projectTo?: string;
    secondaryActionLabel?: string;
    isSecondaryActionDisabled?: boolean;
    onSecondaryActionClick?: () => void;
};

const MyProjectCard = ({
    card,
    candidatesTo,
    projectTo,
    secondaryActionLabel = "Кандидаты",
    isSecondaryActionDisabled = false,
    onSecondaryActionClick,
}: ProjectCardProps) => {
    const { eventId, eventTitle } = resolveMyCardEvent(card);

    return (
        <Stack spacing={1}>
            <Typography
                variant="body2"
                sx={{
                    color: "text.secondary",
                    display: "flex",
                    alignItems: "center",
                    gap: 0.5,
                    ml: { xs: 0.5, sm: 1 },
                    fontSize: { xs: 13, sm: 14 },
                    flexWrap: "wrap",
                }}
            >
                <Box
                    component="span"
                    sx={{ fontWeight: 700, color: "text.primary" }}
                >
                    {card.date}
                </Box>
                {card.weekday ? <span>{card.weekday}</span> : null}
            </Typography>

            <Paper
                elevation={0}
                sx={{
                    borderRadius: 1.5,
                    px: { xs: 1.5, sm: 2, md: 2.5 },
                    py: { xs: 1.75, sm: 2, md: 2.75 },
                }}
            >
                <Stack
                    direction={{ xs: "column", sm: "row" }}
                    spacing={{ xs: 2, sm: 2.5 }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: { xs: "100%", sm: 96 },
                            height: { xs: 120, sm: 96 },
                            flexShrink: 0,
                            borderRadius: 2,
                            bgcolor: "#EEF2F7",
                            border: (theme) =>
                                `1px solid ${theme.palette.border}`,
                            color: "text.secondary",
                            fontSize: 12,
                            fontWeight: 600,
                            textTransform: "uppercase",
                            letterSpacing: 1,
                        }}
                    />

                    <Stack
                        spacing={{ xs: 1, sm: 1.25 }}
                        sx={{ minWidth: 0, flex: 1 }}
                    >
                        <Typography
                            sx={{
                                fontSize: { xs: 20, sm: 22, md: 26 },
                                fontWeight: 500,
                                lineHeight: 1.2,
                                wordBreak: "break-word",
                            }}
                        >
                            {card.title}
                        </Typography>

                        <ProjectCardEventRow
                            eventId={eventId}
                            eventTitle={eventTitle}
                        />

                        {card.subtitle ? (
                            <Typography
                                sx={{
                                    fontSize: { xs: 15, sm: 17, md: 18 },
                                    color: "text.secondary",
                                    lineHeight: 1.3,
                                    wordBreak: "break-word",
                                }}
                            >
                                {card.subtitle}
                            </Typography>
                        ) : null}

                        <Typography
                            sx={{
                                maxWidth: 820,
                                color: "text.secondary",
                                lineHeight: 1.5,
                                fontSize: { xs: 14, sm: 15, md: 16 },
                                display: "-webkit-box",
                                WebkitLineClamp: { xs: 3, md: 5 },
                                WebkitBoxOrient: "vertical",
                                overflow: "hidden",
                                wordBreak: "break-word",
                            }}
                        >
                            {card.description}
                        </Typography>

                        {card.meta ? (
                            <Typography
                                variant="body2"
                                sx={{
                                    color: "text.secondary",
                                    fontSize: { xs: 13, sm: 14 },
                                    wordBreak: "break-word",
                                }}
                            >
                                {card.meta}
                            </Typography>
                        ) : null}

                        <Stack
                            direction={{ xs: "column", sm: "row" }}
                            spacing={1.25}
                            sx={{ pt: { xs: 0.5, sm: 1 }, width: "100%" }}
                        >
                            <Button
                                variant="outlined"
                                fullWidth
                                component={
                                    candidatesTo && !onSecondaryActionClick
                                        ? RouterLink
                                        : "button"
                                }
                                to={candidatesTo}
                                disabled={isSecondaryActionDisabled}
                                onClick={onSecondaryActionClick}
                                sx={{
                                    height: 44,
                                    borderRadius: 2,
                                    flex: { sm: 1 },
                                }}
                            >
                                {secondaryActionLabel}
                            </Button>
                            <Button
                                variant="contained"
                                fullWidth
                                component={projectTo ? RouterLink : "button"}
                                to={projectTo}
                                sx={{
                                    height: 44,
                                    borderRadius: 2,
                                    boxShadow: "none",
                                    flex: { sm: 1 },
                                }}
                            >
                                Подробнее
                            </Button>
                        </Stack>
                    </Stack>
                </Stack>
            </Paper>
        </Stack>
    );
};

export default MyProjectCard;
