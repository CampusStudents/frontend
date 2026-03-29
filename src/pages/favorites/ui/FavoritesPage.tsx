import { Paper, Stack, Typography } from "@mui/material";

import { favoriteCards, favoriteCardTags } from "../model/mockData";

import { ProjectCard } from "@entities/project";
import { ContentFilters } from "@widgets/ContentFilters";

const FavoritesPage = () => {
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

            <ContentFilters />

            <Stack spacing={3}>
                {favoriteCards.map((card) => (
                    <ProjectCard
                        key={card.id}
                        card={card}
                        tags={favoriteCardTags}
                    />
                ))}
            </Stack>
        </Stack>
    );
};

export default FavoritesPage;
