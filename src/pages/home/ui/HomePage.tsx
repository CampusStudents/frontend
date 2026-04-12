import { Stack } from "@mui/material";
import { generatePath, useNavigate } from "react-router-dom";

import { cards, cardTags } from "../model/mockData";

import { ProjectCard } from "@entities/project";
import { routePaths } from "@shared/config";
import { ContentFilters } from "@widgets/ContentFilters";
import { EmptyState } from "@shared/ui/EmptyState";

const HomePage = () => {
    const navigate = useNavigate();

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
