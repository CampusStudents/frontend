import { Chip, Paper, Stack, Typography } from "@mui/material";

import type { ProjectRequirement } from "../model/types";

type ProjectRequirementCardProps = {
    requirement: ProjectRequirement;
};

const ProjectRequirementCard = ({
    requirement,
}: ProjectRequirementCardProps) => {
    return (
        <Paper
            variant="outlined"
            sx={{
                flex: 1,
                p: { xs: 1.75, sm: 2 },
                borderRadius: 1,
                borderColor: "#D7DDE5",
                borderWidth: 2,
                bgcolor: "background.paper",
                minHeight: 184,
            }}
        >
            <Stack spacing={1.25}>
                <Typography
                    sx={{
                        fontSize: { xs: 18, sm: 20 },
                        fontWeight: 600,
                        lineHeight: 1.15,
                    }}
                >
                    {requirement.title}
                </Typography>
                <Typography
                    variant="body2"
                    sx={{
                        color: "#8F959E",
                        lineHeight: 1.35,
                        fontSize: 13,
                        minHeight: 108,
                        maxWidth: 320,
                    }}
                >
                    {requirement.description}
                </Typography>
                <Chip
                    label={requirement.stack}
                    size="small"
                    sx={{
                        width: "fit-content",
                        height: 24,
                        borderRadius: 1.5,
                        bgcolor: "#F1F1F1",
                        color: "#6D6D6D",
                        "& .MuiChip-label": {
                            px: 1,
                            fontSize: 12,
                        },
                    }}
                />
            </Stack>
        </Paper>
    );
};

export default ProjectRequirementCard;
