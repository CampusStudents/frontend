import { Paper, Stack, Typography } from "@mui/material";

import type { ProjectDetails, ProjectRequirement } from "../model/types";

import ProjectInfoPanel from "./ProjectInfoPanel";

import { DetailsTextBlock } from "@widgets/DetailSections";

type ProjectHeroSectionProps = {
    details: ProjectDetails;
    projectId: string;
    requirements: ProjectRequirement[];
};

const ProjectHeroSection = ({
    details,
    projectId,
    requirements,
}: ProjectHeroSectionProps) => {
    return (
        <Paper
            elevation={0}
            sx={{
                borderRadius: 2,
                p: { xs: 2, md: 4 },
            }}
        >
            <Stack spacing={2} sx={{ minWidth: 0 }}>
                <Typography
                    sx={{
                        fontSize: { xs: 26, md: 34 },
                        fontWeight: 600,
                        lineHeight: 1.1,
                    }}
                >
                    {details.title}
                </Typography>

                <ProjectInfoPanel
                    details={details}
                    projectId={projectId}
                    requirements={requirements}
                />
                <DetailsTextBlock
                    label={details.aboutLabel}
                    paragraphs={details.description}
                />
            </Stack>
        </Paper>
    );
};

export default ProjectHeroSection;
