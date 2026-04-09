import { ArrowForwardRounded } from "@mui/icons-material";
import { Box, Button, Paper, Stack, Typography } from "@mui/material";

import type { MyProjectCardData } from "@entities/project/model/types";

type ProjectCardProps = {
    card: MyProjectCardData;
};

const MyProjectCard = ({ card }: ProjectCardProps) => {
    return (
        <Stack spacing={1}>
            <Typography
                variant="body2"
                sx={{
                    color: "text.secondary",
                    display: "flex",
                    alignItems: "center",
                    gap: 0.5,
                    ml: 1,
                }}
            >
                <span style={{ fontWeight: "bold", color: "#000000" }}>
                    {card.date}
                </span>
                <span>{card.weekday}</span>
            </Typography>
            <Paper
                elevation={0}
                sx={{
                    borderRadius: 1.5,
                    px: { xs: 2, md: 2.5 },
                    py: { xs: 2, md: 2.75 },
                }}
            >
                <Stack direction={{ xs: "column", md: "row" }} spacing={2.5}>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: 96,
                            height: 96,
                            flexShrink: 0,
                            borderRadius: 2,
                            bgcolor: "photo",
                            border: (theme) =>
                                `1px solid ${theme.palette.border}`,
                            color: "text.secondary",
                            fontSize: 12,
                            fontWeight: 600,
                            textTransform: "uppercase",
                            letterSpacing: 1,
                        }}
                    >
                        Photo
                    </Box>

                    <Stack spacing={1.25} sx={{ minWidth: 0, flex: 1 }}>
                        <Stack
                            direction={{ xs: "column", lg: "row" }}
                            spacing={1}
                            alignItems={{ xs: "flex-start", lg: "center" }}
                        >
                            <Typography
                                sx={{
                                    fontSize: 26,
                                    fontWeight: 500,
                                    lineHeight: 1.2,
                                }}
                            >
                                {card.title}
                            </Typography>
                            <ArrowForwardRounded
                                sx={{
                                    color: "text.primary",
                                    fontSize: 26,
                                }}
                            />
                            <Typography
                                sx={{
                                    fontSize: 26,
                                    fontWeight: 500,
                                    lineHeight: 1.2,
                                }}
                            >
                                {card.destination}
                            </Typography>
                        </Stack>

                        <Typography
                            sx={{
                                maxWidth: 820,
                                color: "text.secondary",
                                lineHeight: 1.5,
                            }}
                        >
                            {card.description}
                        </Typography>

                        <Stack
                            direction={{ xs: "column", sm: "row" }}
                            spacing={1.5}
                            alignItems={{ xs: "stretch", sm: "center" }}
                            sx={{ pt: 1 }}
                        >
                            <Button
                                variant="outlined"
                                sx={{
                                    minWidth: { sm: 240 },
                                    height: 44,
                                    borderRadius: 2,
                                }}
                            >
                                Кандидаты
                            </Button>
                            <Button
                                variant="contained"
                                sx={{
                                    minWidth: { sm: 240 },
                                    height: 44,
                                    borderRadius: 2,
                                    boxShadow: "none",
                                }}
                            >
                                Перейти в чат
                            </Button>
                        </Stack>
                    </Stack>
                </Stack>
            </Paper>
        </Stack>
    );
};

export default MyProjectCard;
