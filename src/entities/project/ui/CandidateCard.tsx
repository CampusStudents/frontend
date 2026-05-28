import { LocationOnOutlined } from "@mui/icons-material";
import { Box, Button, Chip, Paper, Stack, Typography } from "@mui/material";

import type { CandidatesCardData } from "@entities/project";

type CandidateCardProps = {
    card: CandidatesCardData;
    tags: string[];
    isPending?: boolean;
    onAccept?: () => void;
    onReject?: () => void;
};

const CandidateCard = ({
    card,
    tags,
    isPending = false,
    onAccept,
    onReject,
}: CandidateCardProps) => {
    return (
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
                        border: "1px solid",
                        borderColor: "border",
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
                    <Stack spacing={0.5}>
                        <Typography
                            sx={{
                                fontSize: 26,
                                fontWeight: 500,
                                lineHeight: 1.2,
                            }}
                        >
                            {card.name}
                            {card.age ? `, ${card.age} лет` : ""}
                        </Typography>
                        {card.role || card.status ? (
                            <Typography variant="body2" color="text.secondary">
                                {[card.role, card.status]
                                    .filter(Boolean)
                                    .join(" | ")}
                            </Typography>
                        ) : null}
                    </Stack>

                    {tags.length > 0 ? (
                        <Stack
                            direction="row"
                            spacing={1}
                            flexWrap="wrap"
                            useFlexGap
                        >
                            {tags.map((tag) => (
                                <Chip
                                    key={`${card.id}-${tag}`}
                                    label={tag}
                                    size="small"
                                    sx={{
                                        bgcolor: "background.default",
                                        color: "text.secondary",
                                        borderRadius: 1.5,
                                    }}
                                />
                            ))}
                        </Stack>
                    ) : null}

                    <Typography
                        sx={{
                            maxWidth: 820,
                            color: "text.secondary",
                            lineHeight: 1.5,
                        }}
                    >
                        {card.about}
                    </Typography>

                    <Stack
                        direction="row"
                        spacing={0.5}
                        alignItems="center"
                        sx={{ color: "text.secondary" }}
                    >
                        <LocationOnOutlined sx={{ fontSize: 18 }} />
                        <Typography variant="body2">{card.city}</Typography>
                    </Stack>

                    <Stack
                        direction={{ xs: "column", sm: "row" }}
                        spacing={1.5}
                        alignItems={{ xs: "stretch", sm: "center" }}
                        sx={{ pt: 1 }}
                    >
                        <Button
                            variant="outlined"
                            disabled={isPending}
                            onClick={onReject}
                            sx={{
                                minWidth: { sm: 240 },
                                height: 44,
                                borderRadius: 2,
                            }}
                        >
                            Отклонить
                        </Button>
                        <Button
                            variant="contained"
                            disabled={isPending}
                            onClick={onAccept}
                            sx={{
                                minWidth: { sm: 240 },
                                height: 44,
                                borderRadius: 2,
                                boxShadow: "none",
                            }}
                        >
                            Принять
                        </Button>
                    </Stack>
                </Stack>
            </Stack>
        </Paper>
    );
};

export default CandidateCard;
