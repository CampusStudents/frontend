import {
    CloseRounded,
    FavoriteRounded,
    LocationOnOutlined,
} from "@mui/icons-material";
import { Box, Chip, Paper, Stack, Typography } from "@mui/material";

import type { ProjectCardData } from "@entities/project";
import { ProjectCardEventRow, resolveCardEvent } from "@entities/project";

type SwipeableProjectCardProps = {
    card: ProjectCardData;
    tags: string[];
    offsetX: number;
    offsetY: number;
    rotation: number;
    likeOpacity: number;
    skipOpacity: number;
    isDragging: boolean;
    isExiting: boolean;
    stackIndex: number;
    dragHandlers?: React.HTMLAttributes<HTMLElement>;
};

const SwipeableProjectCard = ({
    card,
    tags,
    offsetX,
    offsetY,
    rotation,
    likeOpacity,
    skipOpacity,
    isDragging,
    isExiting,
    stackIndex,
    dragHandlers,
}: SwipeableProjectCardProps) => {
    const { eventId, eventTitle } = resolveCardEvent(card);
    const isTop = stackIndex === 0;
    const scale = 1 - stackIndex * 0.04;
    const stackOffset = stackIndex * 10;

    return (
        <Paper
            elevation={0}
            {...(isTop ? dragHandlers : undefined)}
            sx={{
                position: "absolute",
                inset: 0,
                borderRadius: 3,
                overflow: "hidden",
                touchAction: isTop ? "none" : "auto",
                userSelect: "none",
                cursor: isTop ? (isDragging ? "grabbing" : "grab") : "default",
                transform: isTop
                    ? `translate3d(${offsetX}px, ${offsetY}px, 0) rotate(${rotation}deg)`
                    : `translateY(${stackOffset}px) scale(${scale})`,
                transition: isTop
                    ? isDragging
                        ? "none"
                        : "transform 280ms ease"
                    : "transform 220ms ease",
                zIndex: 10 - stackIndex,
                border: "1px solid",
                borderColor: "divider",
                boxShadow: isTop
                    ? "0 24px 64px rgba(19, 21, 23, 0.14)"
                    : "0 8px 24px rgba(19, 21, 23, 0.08)",
                pointerEvents: isTop && !isExiting ? "auto" : "none",
            }}
        >
            <Box
                sx={{
                    position: "absolute",
                    top: 20,
                    left: 20,
                    zIndex: 2,
                    px: 1.5,
                    py: 0.75,
                    borderRadius: 1.5,
                    border: "3px solid",
                    borderColor: "#E53935",
                    color: "#E53935",
                    fontWeight: 800,
                    fontSize: 22,
                    letterSpacing: 2,
                    textTransform: "uppercase",
                    opacity: skipOpacity,
                    transform: `rotate(-12deg) scale(${0.9 + skipOpacity * 0.1})`,
                    transition: isDragging ? "none" : "opacity 180ms ease",
                }}
            >
                Пропуск
            </Box>

            <Box
                sx={{
                    position: "absolute",
                    top: 20,
                    right: 20,
                    zIndex: 2,
                    px: 1.5,
                    py: 0.75,
                    borderRadius: 1.5,
                    border: "3px solid",
                    borderColor: "success.main",
                    color: "success.main",
                    fontWeight: 800,
                    fontSize: 22,
                    letterSpacing: 2,
                    textTransform: "uppercase",
                    opacity: likeOpacity,
                    transform: `rotate(12deg) scale(${0.9 + likeOpacity * 0.1})`,
                    transition: isDragging ? "none" : "opacity 180ms ease",
                }}
            >
                В избранное
            </Box>

            <Box
                sx={{
                    height: { xs: 180, sm: 220 },
                    bgcolor: "#EEF2F7",
                    borderBottom: "1px solid",
                    borderColor: "divider",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "text.secondary",
                    fontSize: 12,
                    fontWeight: 600,
                    letterSpacing: 1,
                    textTransform: "uppercase",
                }}
            >
                Проект
            </Box>

            <Stack spacing={1.5} sx={{ p: { xs: 2, sm: 2.5 } }}>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {card.date}
                </Typography>

                <Typography
                    sx={{
                        fontSize: { xs: 22, sm: 26 },
                        fontWeight: 600,
                        lineHeight: 1.2,
                    }}
                >
                    {card.title}
                </Typography>

                <ProjectCardEventRow
                    eventId={eventId}
                    eventTitle={eventTitle}
                />

                <Typography
                    sx={{
                        color: "text.secondary",
                        lineHeight: 1.5,
                        display: "-webkit-box",
                        WebkitLineClamp: 4,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                    }}
                >
                    {card.description}
                </Typography>

                <Stack direction="row" spacing={0.5} alignItems="center">
                    <LocationOnOutlined
                        sx={{ fontSize: 18, color: "text.secondary" }}
                    />
                    <Typography
                        variant="body2"
                        sx={{ color: "text.secondary" }}
                    >
                        {card.meta}
                    </Typography>
                </Stack>

                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                    {tags.slice(0, 4).map((tag) => (
                        <Chip
                            key={`${card.id}-${tag}`}
                            label={tag}
                            size="small"
                            sx={{
                                bgcolor: "background.default",
                                color: "text.secondary",
                            }}
                        />
                    ))}
                </Stack>
            </Stack>
        </Paper>
    );
};

export default SwipeableProjectCard;

export const SwipeDeckActionButtons = ({
    onSkip,
    onLike,
    disabled,
}: {
    onSkip: () => void;
    onLike: () => void;
    disabled?: boolean;
}) => (
    <Stack direction="row" spacing={2} justifyContent="center">
        <Box
            component="button"
            type="button"
            disabled={disabled}
            onClick={onSkip}
            aria-label="Пропустить проект"
            sx={{
                width: 64,
                height: 64,
                borderRadius: "50%",
                border: "1px solid",
                borderColor: "divider",
                bgcolor: "background.paper",
                color: "#E53935",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: disabled ? "not-allowed" : "pointer",
                opacity: disabled ? 0.5 : 1,
                transition: "transform 150ms ease",
                "&:hover": disabled
                    ? undefined
                    : {
                          transform: "scale(1.05)",
                      },
            }}
        >
            <CloseRounded sx={{ fontSize: 32 }} />
        </Box>

        <Box
            component="button"
            type="button"
            disabled={disabled}
            onClick={onLike}
            aria-label="Добавить в избранное"
            sx={{
                width: 64,
                height: 64,
                borderRadius: "50%",
                border: "none",
                bgcolor: "primary.main",
                color: "primary.contrastText",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: disabled ? "not-allowed" : "pointer",
                opacity: disabled ? 0.5 : 1,
                boxShadow: "0 12px 32px rgba(19, 21, 23, 0.16)",
                transition: "transform 150ms ease",
                "&:hover": disabled
                    ? undefined
                    : {
                          transform: "scale(1.05)",
                      },
            }}
        >
            <FavoriteRounded sx={{ fontSize: 32 }} />
        </Box>
    </Stack>
);
