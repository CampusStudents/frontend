import { Paper, Stack, Typography } from "@mui/material";

import { candidateCards, candidatesCardTags } from "../model/mockData";

import { CandidateCard } from "@entities/project"
import { ContentFindFilters } from "@widgets/ContentFilters";

const CandidatesPage = () => {
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
                            Кандидаты
                        </Typography>
                    </Stack>
                </Stack>
            </Paper>

            <ContentFindFilters />

            <Stack spacing={3}>
                {candidateCards.map((card) => (
                    <CandidateCard
                        key={card.id}
                        card={card}
                        tags={candidatesCardTags}
                    />
                ))}
            </Stack>
        </Stack>
    );
};

export default CandidatesPage;
