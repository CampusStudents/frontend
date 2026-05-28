import { SwipeRounded } from "@mui/icons-material";
import { Fab, Tooltip } from "@mui/material";
import { useMemo, useState } from "react";

import type { ProjectSwipeItem } from "./ProjectSwipeZone";
import ProjectSwipeZone from "./ProjectSwipeZone";

import { useFavorites } from "@features/favorites";

type ProjectSwipeDeckProps = {
    items: ProjectSwipeItem[];
};

const ProjectSwipeDeck = ({ items }: ProjectSwipeDeckProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const { isFavorite } = useFavorites();

    const swipeableItems = useMemo(
        () => items.filter((item) => !isFavorite(item.card.id)),
        [items, isFavorite],
    );

    if (swipeableItems.length === 0) {
        return null;
    }

    return (
        <>
            <Tooltip title="Быстрый просмотр проектов" placement="left">
                <Fab
                    color="primary"
                    aria-label="Открыть быстрый просмотр проектов"
                    onClick={() => setIsOpen(true)}
                    sx={{
                        position: "fixed",
                        right: { xs: 16, sm: 24 },
                        bottom: { xs: 16, sm: 24 },
                        zIndex: 1200,
                        width: 56,
                        height: 56,
                        boxShadow: "0 16px 40px rgba(19, 21, 23, 0.22)",
                    }}
                >
                    <SwipeRounded />
                </Fab>
            </Tooltip>

            <ProjectSwipeZone
                open={isOpen}
                items={swipeableItems}
                onClose={() => setIsOpen(false)}
            />
        </>
    );
};

export default ProjectSwipeDeck;
