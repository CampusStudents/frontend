import { Paper, Stack, Typography } from "@mui/material";

import type { ProjectRequirement } from "../model/types";

import ProjectCarousel from "./ProjectCarousel";
import ProjectRequirementCard from "./ProjectRequirementCard";
import ProjectSectionDivider from "./ProjectSectionDivider";

type ProjectRequirementsSectionProps = {
    title: string;
    footer: string;
    requirements: ProjectRequirement[];
};

const ProjectRequirementsSection = ({
    title,
    footer,
    requirements,
}: ProjectRequirementsSectionProps) => {
    return (
        <Paper
            elevation={0}
            sx={{
                borderRadius: 2,
                p: { xs: 2, md: 3 },
            }}
        >
            <Stack spacing={2.5}>
                <Typography
                    sx={{ fontSize: { xs: 24, md: 30 }, fontWeight: 600 }}
                >
                    {title}
                </Typography>

                <ProjectCarousel
                    items={requirements}
                    getKey={(requirement) => requirement.title}
                    renderSlide={(requirement) => (
                        <ProjectRequirementCard requirement={requirement} />
                    )}
                    spaceBetween={16}
                    breakpoints={{
                        0: { slidesPerView: 1.05, spaceBetween: 12 },
                        700: { slidesPerView: 2, spaceBetween: 16 },
                        1100: { slidesPerView: 2.2, spaceBetween: 20 },
                    }}
                />

                <Typography variant="body2" color="text.secondary">
                    {footer}
                </Typography>
                <ProjectSectionDivider />
            </Stack>
        </Paper>
    );
};

export default ProjectRequirementsSection;
