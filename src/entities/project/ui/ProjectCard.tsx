import { FavoriteRounded, LocationOnOutlined } from "@mui/icons-material";
import {
    Box,
    Button,
    Chip,
    IconButton,
    Paper,
    Stack,
    Typography,
} from "@mui/material";

import { resolveCardEvent } from "../lib/resolveCardEvent";

import ProjectCardEventRow from "./ProjectCardEventRow";

import type { ProjectCardData } from "@entities/project";

type ProjectCardProps = {
    card: ProjectCardData;
    tags: string[];
    onClick?: () => void;
};

const ProjectCard = ({ card, tags, onClick }: ProjectCardProps) => {
    const isInteractive = Boolean(onClick);
    const { eventId, eventTitle } = resolveCardEvent(card);

    return (
        <Paper
            elevation={0}
            onClick={onClick}
            onKeyDown={
                isInteractive
                    ? (event) => {
                          if (event.key === "Enter" || event.key === " ") {
                              event.preventDefault();
                              onClick?.();
                          }
                      }
                    : undefined
            }
            role={isInteractive ? "link" : undefined}
            tabIndex={isInteractive ? 0 : undefined}
            sx={[
                {
                    borderRadius: 1.5,
                    px: { xs: 1.5, sm: 2, md: 2.5 },
                    py: { xs: 1.75, sm: 2, md: 2.75 },
                    cursor: isInteractive ? "pointer" : "default",
                    transition:
                        "transform 150ms ease, box-shadow 150ms ease, background-color 150ms ease",
                },
                isInteractive && {
                    "@media (hover: hover)": {
                        "&:hover": {
                            transform: "translateY(-2px)",
                            boxShadow: "0 12px 32px rgba(19, 21, 23, 0.08)",
                        },
                    },
                    "&:focus-visible": {
                        outline: "2px solid",
                        outlineColor: "primary.main",
                        outlineOffset: 3,
                    },
                },
            ]}
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
                        border: "1px solid #D7DEE8",
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
                        variant="body2"
                        sx={{
                            color: "text.secondary",
                            fontSize: { xs: 13, sm: 14 },
                        }}
                    >
                        {card.date}
                    </Typography>

                    <Stack spacing={0.75}>
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
                    </Stack>

                    <Typography
                        sx={{
                            fontSize: { xs: 15, sm: 17, md: 20 },
                            color: "text.secondary",
                            lineHeight: 1.3,
                            wordBreak: "break-word",
                        }}
                    >
                        {card.subtitle}
                    </Typography>

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
                        }}
                    >
                        {card.description}
                    </Typography>

                    <Stack
                        direction="row"
                        spacing={0.5}
                        alignItems="flex-start"
                        sx={{ color: "text.secondary" }}
                    >
                        <LocationOnOutlined
                            sx={{ fontSize: 18, mt: 0.15, flexShrink: 0 }}
                        />
                        <Typography
                            variant="body2"
                            sx={{
                                fontSize: { xs: 13, sm: 14 },
                                wordBreak: "break-word",
                            }}
                        >
                            {card.meta}
                        </Typography>
                    </Stack>

                    <Stack
                        direction="row"
                        spacing={1}
                        flexWrap="wrap"
                        useFlexGap
                    >
                        {tags.map((tag) => (
                            <Chip
                                key={`${card.id}-${tag}`}
                                label={tag}
                                size="small"
                                sx={{
                                    bgcolor: "background.default",
                                    color: "text.secondary",
                                    borderRadius: 1.5,
                                    maxWidth: "100%",
                                    height: "auto",
                                    "& .MuiChip-label": {
                                        whiteSpace: "normal",
                                        py: 0.5,
                                    },
                                }}
                            />
                        ))}
                    </Stack>

                    <Stack spacing={1.5} sx={{ pt: { xs: 0.5, sm: 1 } }}>
                        <Stack
                            direction={{ xs: "column", sm: "row" }}
                            spacing={1.25}
                            sx={{ width: "100%" }}
                        >
                            <Button
                                variant="outlined"
                                fullWidth
                                onClick={(event) => {
                                    event.stopPropagation();
                                    onClick?.();
                                }}
                                sx={{
                                    height: 44,
                                    borderRadius: 2,
                                    flex: { sm: 1 },
                                }}
                            >
                                Подробнее
                            </Button>
                            <Button
                                variant="contained"
                                fullWidth
                                onClick={(event) => {
                                    event.stopPropagation();
                                }}
                                sx={{
                                    height: 44,
                                    borderRadius: 2,
                                    boxShadow: "none",
                                    flex: { sm: 1 },
                                }}
                            >
                                Подать заявку
                            </Button>
                        </Stack>

                        <Stack
                            direction="row"
                            spacing={1.5}
                            alignItems="center"
                            justifyContent={{ xs: "center", sm: "flex-start" }}
                        >
                            <IconButton
                                onClick={(event) => {
                                    event.stopPropagation();
                                }}
                                sx={{
                                    width: 40,
                                    height: 40,
                                    borderRadius: 1.5,
                                    bgcolor: "background.default",
                                }}
                            >
                                <FavoriteRounded
                                    sx={{
                                        color: "primary.main",
                                        fontSize: 18,
                                    }}
                                />
                            </IconButton>
                            <Typography
                                variant="body2"
                                sx={{
                                    color: "text.secondary",
                                    fontSize: { xs: 13, sm: 14 },
                                }}
                            >
                                {card.members}
                            </Typography>
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>
        </Paper>
    );
};

export default ProjectCard;
