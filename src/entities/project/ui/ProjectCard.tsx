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

export type ProjectCardData = {
    id: number;
    date: string;
    title: string;
    destination: string;
    subtitle: string;
    description: string;
    meta: string;
    members: string;
};

type ProjectCardProps = {
    card: ProjectCardData;
    tags: string[];
};

const ProjectCard = ({ card, tags }: ProjectCardProps) => {
    return (
        <Paper
            elevation={0}
            sx={{
                borderRadius: 2.5,
                px: { xs: 2, md: 2.5 },
                py: { xs: 2, md: 2.75 },
            }}
        >
            <Stack direction={{ xs: "column", md: "row" }} spacing={2.5}>
                <Box
                    sx={{
                        position: "relative",
                        width: 76,
                        height: 76,
                        flexShrink: 0,
                        borderRadius: 2,
                        overflow: "hidden",
                        bgcolor: "#FFF6E6",
                        border: "1px solid #F1E5C8",
                        "&::before": {
                            content: '""',
                            position: "absolute",
                            inset: 0,
                            backgroundImage:
                                "linear-gradient(#F3D48A 1px, transparent 1px), linear-gradient(90deg, #F3D48A 1px, transparent 1px)",
                            backgroundSize: "14px 14px",
                            opacity: 0.45,
                        },
                    }}
                >
                    <Box
                        sx={{
                            position: "absolute",
                            left: 16,
                            top: 18,
                            width: 24,
                            height: 24,
                            borderRadius: "50%",
                            bgcolor: "#5ED1A8",
                            border: "3px solid #FFFFFF",
                        }}
                    />
                    <Box
                        sx={{
                            position: "absolute",
                            right: 13,
                            bottom: 12,
                            width: 30,
                            height: 30,
                            borderRadius: 1.5,
                            bgcolor: "#FFFFFF",
                            border: "2px solid #2A2F45",
                            transform: "rotate(-12deg)",
                        }}
                    />
                    <Box
                        sx={{
                            position: "absolute",
                            left: 15,
                            bottom: 14,
                            width: 28,
                            height: 12,
                            borderRadius: 999,
                            border: "3px solid #2A2F45",
                            borderTop: "none",
                        }}
                    />
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
                                    bgcolor: "#F5F7FB",
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
                                    bgcolor: "#F5F7FB",
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
