import { CheckRounded, CloseRounded } from "@mui/icons-material";
import { Box, IconButton, Paper, Stack, Typography } from "@mui/material";
import { keyframes } from "@mui/system";

import type { ProjectToastData, ProjectToastState } from "../model/uiTypes";

const toastEnter = keyframes`
    0% {
        opacity: 0;
        transform: translateY(-12px);
    }
    100% {
        opacity: 1;
        transform: translateY(0);
    }
`;

const toastExit = keyframes`
    0% {
        opacity: 1;
        transform: translateY(0);
    }
    100% {
        opacity: 0;
        transform: translateY(-10px);
    }
`;

type ProjectToastProps = {
    state: ProjectToastState;
    data: ProjectToastData;
    onClose: () => void;
};

const ProjectToast = ({ state, data, onClose }: ProjectToastProps) => {
    if (state === "closed") {
        return null;
    }

    return (
        <Box
            sx={{
                position: "fixed",
                top: { xs: 16, sm: 24 },
                right: { xs: 16, sm: 24 },
                zIndex: 20010,
            }}
        >
            <Paper
                elevation={0}
                sx={{
                    minWidth: { xs: 280, sm: 380 },
                    maxWidth: 420,
                    px: 2,
                    py: 1.75,
                    borderRadius: 2.5,
                    boxShadow: "0 16px 40px rgba(18, 24, 38, 0.12)",
                    transformOrigin: "top right",
                    border: "1px solid",
                    borderColor: "divider",
                    animation: `${state === "open" ? toastEnter : toastExit} 240ms ease forwards`,
                }}
            >
                <Stack
                    direction="row"
                    alignItems="flex-start"
                    justifyContent="space-between"
                    useFlexGap
                    sx={{ gap: 1.75 }}
                >
                    <Stack
                        direction="row"
                        alignItems="center"
                        useFlexGap
                        sx={{ gap: 1.75, minWidth: 0 }}
                    >
                        <Paper
                            elevation={0}
                            sx={{
                                width: 32,
                                height: 32,
                                borderRadius: 1,
                                bgcolor: "#151515",
                                color: "#FFFFFF",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: 10,
                                fontWeight: 700,
                                flexShrink: 0,
                            }}
                        >
                            {data.title
                                .split(" ")
                                .map((word) => word[0])
                                .join("")
                                .slice(0, 3)}
                        </Paper>

                        <Stack useFlexGap sx={{ gap: 0.5, minWidth: 0 }}>
                            <Typography
                                sx={{
                                    color: "text.secondary",
                                    fontSize: 14,
                                    lineHeight: 1.2,
                                }}
                            >
                                {data.title}
                            </Typography>
                            <Stack
                                direction="row"
                                alignItems="center"
                                useFlexGap
                                sx={{ gap: 1.25 }}
                            >
                                <CheckRounded
                                    sx={{
                                        fontSize: 28,
                                        color: "#111111",
                                    }}
                                />
                                <Typography
                                    sx={{
                                        fontSize: 16,
                                        fontWeight: 500,
                                    }}
                                >
                                    {data.message}
                                </Typography>
                            </Stack>
                        </Stack>
                    </Stack>

                    <IconButton
                        aria-label="Закрыть тост"
                        onClick={onClose}
                        size="small"
                        sx={{
                            mt: -0.5,
                            mr: -0.5,
                            color: "text.secondary",
                            flexShrink: 0,
                            "&:hover": {
                                bgcolor: "rgba(17, 17, 17, 0.06)",
                            },
                        }}
                    >
                        <CloseRounded sx={{ fontSize: 18 }} />
                    </IconButton>
                </Stack>
            </Paper>
        </Box>
    );
};

export default ProjectToast;
