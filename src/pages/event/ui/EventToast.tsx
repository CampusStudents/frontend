import { CheckRounded } from "@mui/icons-material";
import { Box, Fade, Paper, Stack, Typography } from "@mui/material";

import type { EventToastData } from "../model/uiTypes";
import { eventDetails } from "../model/mockData";

type EventToastProps = {
    open: boolean;
    data: EventToastData;
};

const EventToast = ({ open, data }: EventToastProps) => {
    return (
        <Fade in={open} timeout={250} unmountOnExit>
            <Box
                sx={{
                    position: "fixed",
                    top: { xs: 16, sm: 24 },
                    left: { xs: 16, sm: 24 },
                    zIndex: 1400,
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
                        boxShadow: "0 16px 48px rgba(18, 24, 38, 0.12)",
                    }}
                >
                    <Stack direction="row" spacing={1.75} alignItems="center">
                        <Paper
                            elevation={0}
                            sx={{
                                width: 28,
                                height: 28,
                                borderRadius: 1,
                                bgcolor: "#151515",
                                color: "#FFFFFF",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: 9,
                                fontWeight: 700,
                                flexShrink: 0,
                            }}
                        >
                            {eventDetails.locationName
                                .split(" ")
                                .map((word) => word[0])
                                .join("")
                                .slice(0, 3)}
                        </Paper>

                        <Stack spacing={0.5}>
                            <Typography
                                sx={{
                                    color: "text.secondary",
                                    fontSize: 15,
                                }}
                            >
                                {data.title}
                            </Typography>
                            <Stack
                                direction="row"
                                spacing={1.25}
                                alignItems="center"
                            >
                                <CheckRounded
                                    sx={{
                                        fontSize: 34,
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
                </Paper>
            </Box>
        </Fade>
    );
};

export default EventToast;
