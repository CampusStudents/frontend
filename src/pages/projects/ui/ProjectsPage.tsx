import { Paper, Stack, Typography } from "@mui/material";
import { useState } from "react";

import { projectCards } from "../model/mockData";

import { MyProjectCard } from "@entities/project";
import { routePaths } from "@shared/config";
import { ProjectsToggleGroup } from "@widgets/ContentFilters";

const ProjectsPage = () => {
    const [selectedView, setSelectedView] = useState("participants");

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
                            Мои Проекты
                        </Typography>
                    </Stack>
                </Stack>
            </Paper>

            <ProjectsToggleGroup
                selectedView={selectedView}
                onViewChange={setSelectedView}
            />

            <Stack spacing={3}>
                {projectCards.map((card) => (
                    <MyProjectCard
                        key={card.id}
                        card={card}
                        candidatesTo={routePaths.candidates}
                    />
                ))}
            </Stack>
        </Stack>
    );
};

export default ProjectsPage;
