import { Stack } from "@mui/material";

import { cards, cardTags } from "../model/mockData";

import { ProjectCard } from "@entities/project";
import { ContentFilters } from "@widgets/ContentFilters";
import { EmptyState } from "@shared/ui/EmptyState";

const HomePage = () => {
    return (
        <Stack spacing={3}>
            <ContentFilters />

            {cards.length > 0 ? (
                <Stack spacing={3}>
                    {cards.map((card) => (
                        <ProjectCard
                            key={card.id}
                            card={card}
                            tags={cardTags}
                        />
                    ))}
                </Stack>
            ) : (
                <EmptyState
                    title="Здесь пока пусто, но это отличный шанс стать первым!"
                    description="Сейчас здесь тихо, но это временно. Видимо, команды пока собираются с мыслями и дедлайнами."
                />
            )}
        </Stack>
    );
};

export default HomePage;
