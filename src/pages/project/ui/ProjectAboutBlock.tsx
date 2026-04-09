import { Stack, Typography } from "@mui/material";

import ProjectSectionDivider from "./ProjectSectionDivider";

type ProjectAboutBlockProps = {
    label: string;
    paragraphs: string[];
};

const ProjectAboutBlock = ({ label, paragraphs }: ProjectAboutBlockProps) => {
    return (
        <Stack spacing={1.25}>
            <Typography
                variant="body2"
                sx={{
                    color: "text.secondary",
                    fontWeight: 600,
                }}
            >
                {label}
            </Typography>
            <ProjectSectionDivider />
            {paragraphs.map((paragraph) => (
                <Typography
                    key={paragraph}
                    variant="body2"
                    sx={{
                        color: "text.secondary",
                        lineHeight: 1.65,
                    }}
                >
                    {paragraph}
                </Typography>
            ))}
        </Stack>
    );
};

export default ProjectAboutBlock;
