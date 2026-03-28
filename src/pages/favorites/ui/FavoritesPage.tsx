import { Box, Paper, Stack, Typography } from "@mui/material";

import { favoriteCards, favoriteCardTags } from "../model/mockData";

import { ProjectCard } from "@entities/project";
import { AppHeader } from "@widgets/AppHeader";
import { ContentFilters } from "@widgets/ContentFilters";

const FavoritesPage = () => {
    return (
        <Box
            sx={{
                minHeight: "100vh",
                bgcolor: "#F5F7FB",
                px: { xs: 2, md: 4 },
                py: { xs: 2, md: 3 },
            }}
        >
            <Box sx={{ maxWidth: 1280, mx: "auto" }}>
                <AppHeader />

                <Stack spacing={3}>
                    <Paper
                        elevation={0}
                        sx={{
                            borderRadius: 2.5,
                            bgcolor: "transparent",
                        }}
                    >
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
            </Box>
        </Box>
    );
};

export default FavoritesPage;
