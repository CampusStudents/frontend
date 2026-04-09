import { OpenInNewRounded } from "@mui/icons-material";
import { Box, Link, Paper, Stack, Typography } from "@mui/material";

import type { ProjectDetails } from "../model/types";

import ProjectCarousel from "./ProjectCarousel";
import ProjectSectionDivider from "./ProjectSectionDivider";

type ProjectEventSectionProps = {
    details: ProjectDetails;
};

const ProjectEventSection = ({ details }: ProjectEventSectionProps) => {
    return (
        <Paper
            elevation={0}
            sx={{
                borderRadius: 2,
                p: { xs: 2, md: 3 },
            }}
        >
            <Stack spacing={2.5}>
                <Stack spacing={0.75}>
                    <Typography
                        sx={{
                            fontSize: { xs: 24, md: 30 },
                            fontWeight: 600,
                        }}
                    >
                        {details.eventTitle}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {details.aboutLabel}
                    </Typography>
                    <ProjectSectionDivider />
                </Stack>

                {details.description.map((paragraph) => (
                    <Typography
                        key={`event-${paragraph}`}
                        variant="body2"
                        sx={{ color: "text.secondary", lineHeight: 1.7 }}
                    >
                        {paragraph}
                    </Typography>
                ))}

                <Link
                    href="#"
                    underline="hover"
                    sx={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 0.75,
                        width: "fit-content",
                        fontWeight: 500,
                    }}
                >
                    {details.linkLabel}
                    <OpenInNewRounded sx={{ fontSize: 16 }} />
                </Link>

                <Stack spacing={1.5}>
                    <Typography sx={{ fontWeight: 600 }}>
                        {details.galleryTitle}
                    </Typography>
                    <ProjectCarousel
                        items={details.gallery}
                        getKey={(image) => image}
                        renderSlide={(image) => {
                            const index = details.gallery.indexOf(image);

                            return (
                                <Box
                                    component="img"
                                    src={image}
                                    alt={`Фото с мероприятия ${index + 1}`}
                                    sx={{
                                        width: "100%",
                                        aspectRatio: "1 / 1.15",
                                        objectFit: "cover",
                                        borderRadius: 1.5,
                                        display: "block",
                                    }}
                                />
                            );
                        }}
                        spaceBetween={16}
                        breakpoints={{
                            0: { slidesPerView: 1.1, spaceBetween: 12 },
                            700: { slidesPerView: 2.2, spaceBetween: 16 },
                            1100: { slidesPerView: 3.2, spaceBetween: 18 },
                        }}
                    />
                </Stack>
            </Stack>
        </Paper>
    );
};

export default ProjectEventSection;
