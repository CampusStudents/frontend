import { Paper, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { generatePath, useNavigate } from "react-router-dom";

import { favoriteCards, favoriteCardTags } from "../model/mockData";

import { ProjectCard } from "@entities/project";
import { routePaths } from "@shared/config";
import { ContentFilters } from "@widgets/ContentFilters";

const FavoritesPage = () => {
    const navigate = useNavigate();
    const [selectedView, setSelectedView] = useState("projects");

    return (
        <Stack spacing={3}>
            <Paper
                elevation={0}
                sx={{
                    borderRadius: 2.5,
                    bgcolor: "transparent",
                }}
            >
                <Stack spacing={3}>
                    <Stack spacing={0.75}>
                        <Typography
                            sx={{
                                fontSize: { xs: 28, md: 34 },
                                fontWeight: 600,
                                lineHeight: 1.1,
                            }}
                        >
                            Избранное
                        </Typography>
                    </Stack>
                </Stack>
            </Paper>

            <ContentFilters
                selectedView={selectedView}
                onViewChange={setSelectedView}
            />

            <Stack spacing={3}>
                {favoriteCards.map((card) => (
                    <ProjectCard
                        key={card.id}
                        card={card}
                        tags={favoriteCardTags}
                        onClick={() =>
                            navigate(
                                generatePath(routePaths.project, {
                                    id: String(card.id),
                                }),
                            )
                        }
                    />
                ))}
            </Stack>
        </Stack>
    );
};

export default FavoritesPage;
