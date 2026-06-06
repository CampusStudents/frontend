import { CloseRounded } from "@mui/icons-material";
import { Box, Fade, IconButton, Stack, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";

import { useSwipeGesture } from "./useSwipeGesture";
import SwipeableProjectCard, {
    SwipeDeckActionButtons,
} from "./SwipeableProjectCard";

import type { ProjectCardData } from "@entities/project";
import { useFavorites } from "@features/favorites";
import { EmptyState } from "@shared/ui/EmptyState";
import { StatusToast } from "@shared/ui/StatusToast";

export type ProjectSwipeItem = {
    card: ProjectCardData;
    tags: string[];
};

type ProjectSwipeZoneProps = {
    open: boolean;
    items: ProjectSwipeItem[];
    onClose: () => void;
};

const ProjectSwipeZone = ({ open, items, onClose }: ProjectSwipeZoneProps) => {
    const { addFavorite } = useFavorites();
    const [deck, setDeck] = useState<ProjectSwipeItem[]>([]);
    const [toast, setToast] = useState<{
        open: boolean;
        title: string;
        message: string;
    }>({
        open: false,
        title: "",
        message: "",
    });

    useEffect(() => {
        if (!open) {
            return;
        }

        setDeck(items);
        // Колода пересобирается только при открытии оверлея, не при каждом рендере родителя.
        // eslint-disable-next-line react-hooks/exhaustive-deps -- items snapshot on open
    }, [open]);

    useEffect(() => {
        if (!open) {
            return;
        }

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                onClose();
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [onClose, open]);

    const handleSwipe = useCallback(
        (direction: "left" | "right") => {
            setDeck((current) => {
                const [currentCard, ...rest] = current;

                if (!currentCard) {
                    return current;
                }

                if (direction === "right") {
                    addFavorite(currentCard.card.id).catch(() => {
                        setToast({
                            open: true,
                            title: currentCard.card.title,
                            message: "Не удалось добавить проект в избранное.",
                        });
                    });
                    setToast({
                        open: true,
                        title: currentCard.card.title,
                        message: "Проект добавлен в избранное!",
                    });
                }

                return rest;
            });
        },
        [addFavorite],
    );

    const {
        offset,
        isDragging,
        isExiting,
        rotation,
        likeOpacity,
        skipOpacity,
        swipe,
        handlers,
    } = useSwipeGesture({ onSwipe: handleSwipe });

    const visibleStack = deck.slice(0, 3);
    const topCard = deck[0];
    const isEmpty = deck.length === 0;

    return (
        <>
            <Fade in={open} timeout={250} unmountOnExit>
                <Box
                    sx={{
                        position: "fixed",
                        inset: 0,
                        zIndex: 14000,
                        bgcolor: "rgba(15, 18, 23, 0.58)",
                        backdropFilter: "blur(3px)",
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        sx={{
                            px: { xs: 2, sm: 3 },
                            py: { xs: 1.5, sm: 2 },
                            color: "#FFFFFF",
                        }}
                    >
                        <Stack spacing={0.25}>
                            <Typography
                                sx={{
                                    fontSize: { xs: 22, sm: 28 },
                                    fontWeight: 600,
                                    lineHeight: 1.1,
                                }}
                            >
                                Быстрый просмотр
                            </Typography>
                            <Typography sx={{ opacity: 0.82, fontSize: 15 }}>
                                Свайп вправо — в избранное, влево — пропуск
                            </Typography>
                        </Stack>

                        <IconButton
                            onClick={onClose}
                            aria-label="Закрыть"
                            sx={{
                                color: "#FFFFFF",
                                bgcolor: "rgba(255,255,255,0.12)",
                                "&:hover": {
                                    bgcolor: "rgba(255,255,255,0.2)",
                                },
                            }}
                        >
                            <CloseRounded />
                        </IconButton>
                    </Stack>

                    <Box
                        sx={{
                            flex: 1,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            px: { xs: 2, sm: 3 },
                            pb: { xs: 3, sm: 4 },
                            gap: 3,
                            minHeight: 0,
                        }}
                    >
                        {isEmpty ? (
                            <Box
                                sx={{
                                    width: "min(520px, 100%)",
                                    bgcolor: "background.paper",
                                    borderRadius: 3,
                                    p: { xs: 2, sm: 3 },
                                }}
                            >
                                <EmptyState
                                    title="Карточки закончились"
                                    description="Вы просмотрели все доступные проекты. Загляните позже — появятся новые."
                                />
                            </Box>
                        ) : (
                            <>
                                <Box
                                    sx={{
                                        position: "relative",
                                        width: "min(420px, 100%)",
                                        height: {
                                            xs: "min(62vh, 520px)",
                                            sm: "min(68vh, 580px)",
                                        },
                                        maxHeight: 580,
                                    }}
                                >
                                    {visibleStack
                                        .map((item, index) => (
                                            <SwipeableProjectCard
                                                key={item.card.id}
                                                card={item.card}
                                                tags={item.tags}
                                                stackIndex={index}
                                                offsetX={
                                                    index === 0 ? offset.x : 0
                                                }
                                                offsetY={
                                                    index === 0 ? offset.y : 0
                                                }
                                                rotation={
                                                    index === 0 ? rotation : 0
                                                }
                                                likeOpacity={
                                                    index === 0
                                                        ? likeOpacity
                                                        : 0
                                                }
                                                skipOpacity={
                                                    index === 0
                                                        ? skipOpacity
                                                        : 0
                                                }
                                                isDragging={
                                                    index === 0 && isDragging
                                                }
                                                isExiting={
                                                    index === 0 && isExiting
                                                }
                                                dragHandlers={
                                                    index === 0
                                                        ? handlers
                                                        : undefined
                                                }
                                            />
                                        ))
                                        .reverse()}
                                </Box>

                                <SwipeDeckActionButtons
                                    disabled={!topCard || isExiting}
                                    onSkip={() => swipe("left")}
                                    onLike={() => swipe("right")}
                                />
                            </>
                        )}
                    </Box>
                </Box>
            </Fade>

            <StatusToast
                open={toast.open}
                title={toast.title}
                message={toast.message}
                onClose={() =>
                    setToast((current) => ({ ...current, open: false }))
                }
            />
        </>
    );
};

export default ProjectSwipeZone;
