import {
    ArrowForwardRounded,
    FavoriteRounded,
    LocationOnOutlined,
} from "@mui/icons-material";
import {
    Box,
    Button,
    Chip,
    IconButton,
    Paper,
    Stack,
    Typography,
} from "@mui/material";

import type { ProjectCardData } from "@entities/project";

type ProjectCardProps = {
    card: ProjectCardData;
    tags: string[];
};

const ProjectCard = ({ card, tags }: ProjectCardProps) => {
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
                        bgcolor: "#EEF2F7",
                        border: "1px solid #D7DEE8",
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
                    <Typography
                        variant="body2"
                        sx={{ color: "text.secondary" }}
                    >
                        {card.date}
                    </Typography>

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
                            fontSize: 20,
                            color: "text.secondary",
                            lineHeight: 1.2,
                        }}
                    >
                        {card.subtitle}
                    </Typography>

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
                        direction="row"
                        spacing={0.5}
                        alignItems="center"
                        sx={{ color: "text.secondary" }}
                    >
                        <LocationOnOutlined sx={{ fontSize: 18 }} />
                        <Typography variant="body2">{card.meta}</Typography>
                    </Stack>

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
                            Подробнее
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
                            Подать заявку
                        </Button>
                        <Stack
                            direction="row"
                            spacing={1.5}
                            alignItems="center"
                        >
                            <IconButton
                                sx={{
                                    width: 36,
                                    height: 36,
                                    borderRadius: 1.5,
                                    bgcolor: "background.default",
                                }}
                            >
                                <FavoriteRounded
                                    sx={{
                                        color: "primary.main",
                                        fontSize: 18,
                                    }}
                                />
                            </IconButton>
                            <Typography
                                variant="body2"
                                sx={{
                                    color: "text.secondary",
                                }}
                            >
                                {card.members}
                            </Typography>
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>
        </Paper>
    );
};

export default ProjectCard;
