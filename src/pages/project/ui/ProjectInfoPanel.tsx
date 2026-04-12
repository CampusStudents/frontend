import { FavoriteBorderRounded, NorthEastRounded } from "@mui/icons-material";
import { Button, IconButton, Paper, Stack, Typography } from "@mui/material";

import type { ProjectDetails } from "../model/types";

import {
    DetailsDateBadge,
    DetailsLocationBadge,
} from "@widgets/DetailSections";

type ProjectInfoPanelProps = {
    details: ProjectDetails;
};

const ProjectInfoPanel = ({ details }: ProjectInfoPanelProps) => {
    return (
        <Paper
            elevation={0}
            sx={{
                borderRadius: 2,
            }}
        >
            <Stack spacing={1.5}>
                <Stack
                    direction={{ xs: "column", sm: "row" }}
                    spacing={1.25}
                    alignItems={{ xs: "flex-start", sm: "center" }}
                >
                    <DetailsDateBadge day="11" month="ноя" />

                    <Stack spacing={0.2}>
                        <Typography
                            sx={{
                                fontSize: { xs: 20, sm: 20 },
                                fontWeight: 500,
                                lineHeight: 1.1,
                            }}
                        >
                            {details.organizer}
                        </Typography>
                        <Typography
                            sx={{
                                color: "text.secondary",
                                fontSize: { xs: 14, sm: 16 },
                                lineHeight: 1.15,
                            }}
                        >
                            10:00 - 11:00
                        </Typography>
                    </Stack>
                </Stack>

                <Stack
                    direction={{ xs: "column", sm: "row" }}
                    spacing={1.25}
                    alignItems={{ xs: "flex-start", sm: "center" }}
                >
                    <DetailsLocationBadge />

                    <Stack spacing={0.2}>
                        <Stack
                            direction="row"
                            spacing={0.75}
                            alignItems="center"
                        >
                            <Typography
                                sx={{
                                    fontSize: { xs: 16, sm: 20 },
                                    fontWeight: 500,
                                    lineHeight: 1.1,
                                }}
                            >
                                {details.venue}
                            </Typography>
                            <NorthEastRounded
                                sx={{
                                    fontSize: 18,
                                    color: "text.secondary",
                                }}
                            />
                        </Stack>
                        <Typography
                            sx={{
                                color: "text.secondary",
                                fontSize: { xs: 14, sm: 16 },
                                lineHeight: 1.15,
                            }}
                        >
                            {details.address}
                        </Typography>
                    </Stack>
                </Stack>

                <Stack direction="row" spacing={1.25} alignItems="stretch">
                    <Button
                        variant="contained"
                        sx={{
                            minWidth: 250,
                            minHeight: 38,
                            borderRadius: 1,
                            boxShadow: "none",
                            fontSize: 16,
                            fontWeight: 500,
                            px: 2.5,
                            textTransform: "none",
                        }}
                    >
                        {details.actionLabel}
                    </Button>
                    <IconButton
                        aria-label="Добавить в избранное"
                        sx={{
                            width: 42,
                            height: 42,
                            borderRadius: 1.5,
                            bgcolor: "rgba(60, 102, 224, 0.08)",
                            color: "primary.main",
                            flexShrink: 0,
                        }}
                    >
                        <FavoriteBorderRounded sx={{ fontSize: 22 }} />
                    </IconButton>
                </Stack>
            </Stack>
        </Paper>
    );
};

export default ProjectInfoPanel;
