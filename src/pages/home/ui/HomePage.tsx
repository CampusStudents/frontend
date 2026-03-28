import { Box, Stack } from "@mui/material";

import { cards, cardTags } from "../model/mockData";

import { ProjectCard } from "@entities/project";
import { AppHeader } from "@widgets/AppHeader";
import { ContentFilters } from "@widgets/ContentFilters";

const HomePage = () => {
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
                    <ContentFilters />

                    <Stack spacing={3}>
                        {cards.map((card) => (
                            <ProjectCard
                                key={card.id}
                                card={card}
                                tags={cardTags}
                            />
                        ))}
                    </Stack>
                </Stack>
            </Box>
        </Box>
    );
};

export default HomePage;
