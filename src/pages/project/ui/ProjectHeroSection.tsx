import { Box, Paper, Stack, Typography } from "@mui/material";

import type { ProjectDetails } from "../model/types";

import ProjectInfoPanel from "./ProjectInfoPanel";

import { DetailsTextBlock } from "@widgets/DetailSections";

type ProjectHeroSectionProps = {
    details: ProjectDetails;
};

const ProjectHeroSection = ({ details }: ProjectHeroSectionProps) => {
    return (
        <Paper
            elevation={0}
            sx={{
                borderRadius: 2,
                p: { xs: 2, md: 4 },
            }}
        >
            <Stack
                direction={{ xs: "column", md: "row" }}
                spacing={{ xs: 2.5, md: 3 }}
                alignItems={{ xs: "stretch", md: "flex-start" }}
            >
                <Box
                    component="img"
                    src={details.heroImage}
                    alt={details.title}
                    sx={{
                        width: { xs: "100%", md: 320 },
                        height: { xs: 220, sm: 280, md: 248 },
                        objectFit: "cover",
                        borderRadius: 2,
                        flexShrink: 0,
                    }}
                />

                <Stack spacing={2} sx={{ minWidth: 0, flex: 1 }}>
                    <Typography
                        sx={{
                            fontSize: { xs: 26, md: 34 },
                            fontWeight: 600,
                            lineHeight: 1.1,
                        }}
                    >
                        {details.title}
                    </Typography>

                    <ProjectInfoPanel details={details} />
                    <DetailsTextBlock
                        label={details.aboutLabel}
                        paragraphs={details.description}
                    />
                </Stack>
            </Stack>
        </Paper>
    );
};

export default ProjectHeroSection;
