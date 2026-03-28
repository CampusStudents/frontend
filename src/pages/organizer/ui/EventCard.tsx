import { Box, Button, Paper, Stack, Typography } from "@mui/material";

type EventCardProps = {
    title: string;
    description: string;
};

export const EventCard = ({ title, description }: EventCardProps) => {
    return (
        <Paper
            elevation={0}
            sx={{
                borderRadius: 1.5,
                px: { xs: 1.5, md: 1.75 },
                py: { xs: 1.5, md: 1.75 },
                border: "2px dashed #85A4FF",
                bgcolor: "#FFFFFF",
            }}
        >
            <Stack spacing={1.75}>
                <Stack
                    direction={{ xs: "column", md: "row" }}
                    spacing={1.75}
                    alignItems={{ xs: "stretch", md: "center" }}
                >
                    <Box
                        sx={{
                            width: 72,
                            height: 72,
                            borderRadius: 2,
                            bgcolor: "#FFF8E8",
                            border: "1px solid #F3E1B7",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "text.secondary",
                            fontSize: 11,
                            fontWeight: 700,
                            letterSpacing: 0.8,
                            textTransform: "uppercase",
                            flexShrink: 0,
                        }}
                    >
                        Photo
                    </Box>

                    <Stack spacing={1.75} sx={{ minWidth: 0, flex: 1 }}>
                        <Stack spacing={0.5}>
                            <Typography
                                sx={{
                                    fontSize: 21,
                                    fontWeight: 600,
                                    lineHeight: 1.15,
                                }}
                            >
                                {title}
                            </Typography>
                            <Typography
                                sx={{
                                    color: "text.secondary",
                                    lineHeight: 1.5,
                                    maxWidth: 700,
                                    fontSize: 14,
                                }}
                            >
                                {description}
                            </Typography>
                        </Stack>

                        <Stack
                            direction={{ xs: "column", sm: "row" }}
                            spacing={1.25}
                        >
                            <Button
                                variant="outlined"
                                sx={{
                                    minWidth: { sm: 250 },
                                    flex: 1,
                                    height: 40,
                                    borderRadius: 2,
                                }}
                            >
                                Подробнее
                            </Button>
                            <Button
                                variant="contained"
                                sx={{
                                    minWidth: { sm: 250 },
                                    flex: 1,
                                    height: 40,
                                    borderRadius: 2,
                                    boxShadow: "none",
                                }}
                            >
                                Собрать команду
                            </Button>
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>
        </Paper>
    );
};
