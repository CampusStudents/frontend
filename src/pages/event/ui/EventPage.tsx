import {
    LanguageRounded,
    NorthEastRounded,
    Telegram,
} from "@mui/icons-material";
import {
    Button,
    IconButton,
    Link,
    Paper,
    Stack,
    Typography,
} from "@mui/material";
import { generatePath, Link as RouterLink } from "react-router-dom";

import { eventDetails } from "../model/mockData";

import {
    DetailsCarousel,
    DetailsDateBadge,
    DetailsLocationBadge,
    DetailsSectionDivider,
} from "@widgets/DetailSections";
import { routePaths } from "@shared/config";

const EventPage = () => {
    return (
        <Paper
            elevation={0}
            sx={{
                borderRadius: 2.5,
                px: { xs: 2, md: 3 },
                py: { xs: 2.5, md: 3 },
            }}
        >
            <Stack spacing={3}>
                <Typography
                    sx={{
                        fontSize: { xs: 30, md: 38 },
                        fontWeight: 600,
                        lineHeight: 1.1,
                    }}
                >
                    {eventDetails.title}
                </Typography>

                <DetailsCarousel
                    items={eventDetails.gallery}
                    getKey={(image) => image}
                    renderSlide={(image) => {
                        const index = eventDetails.gallery.indexOf(image);

                        return (
                            <Paper
                                component="img"
                                src={image}
                                alt={`Фото с мероприятия ${index + 1}`}
                                sx={{
                                    width: "100%",
                                    height: { xs: 220, sm: 240, lg: 202 },
                                    borderRadius: 1.5,
                                    objectFit: "cover",
                                    display: "block",
                                }}
                            />
                        );
                    }}
                    spaceBetween={10}
                    breakpoints={{
                        0: { slidesPerView: 1, spaceBetween: 10 },
                        700: { slidesPerView: 2, spaceBetween: 10 },
                        1100: { slidesPerView: 3, spaceBetween: 10 },
                        1380: { slidesPerView: 5, spaceBetween: 10 },
                    }}
                />

                <Stack
                    direction={{ xs: "column", lg: "row" }}
                    spacing={{ xs: 3, lg: 4.5 }}
                    alignItems="flex-start"
                >
                    <Stack
                        spacing={1.5}
                        sx={{
                            width: { xs: "100%", lg: 320 },
                            flexShrink: 0,
                        }}
                    >
                        <Stack
                            direction="row"
                            spacing={1.25}
                            alignItems="flex-start"
                        >
                            <DetailsDateBadge
                                day={eventDetails.day}
                                month={eventDetails.month}
                            />
                            <Stack spacing={0.25}>
                                <Typography sx={{ fontWeight: 500 }}>
                                    {eventDetails.dateLabel}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    {eventDetails.timeLabel}
                                </Typography>
                            </Stack>
                        </Stack>

                        <Stack
                            direction="row"
                            spacing={1.25}
                            alignItems="flex-start"
                        >
                            <DetailsLocationBadge />
                            <Stack spacing={0.25}>
                                <Stack
                                    direction="row"
                                    spacing={0.5}
                                    alignItems="center"
                                >
                                    <Typography sx={{ fontWeight: 500 }}>
                                        {eventDetails.locationName}
                                    </Typography>
                                    <NorthEastRounded
                                        sx={{
                                            fontSize: 16,
                                            color: "text.secondary",
                                        }}
                                    />
                                </Stack>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    {eventDetails.address}
                                </Typography>
                            </Stack>
                        </Stack>

                        <Paper
                            variant="outlined"
                            sx={{
                                p: 1.5,
                                borderRadius: 1.5,
                                borderColor: "divider",
                            }}
                        >
                            <Stack spacing={1}>
                                <Typography
                                    variant="caption"
                                    sx={{ color: "text.secondary" }}
                                >
                                    {eventDetails.organizerLabel}
                                </Typography>
                                <Stack
                                    direction="row"
                                    spacing={1}
                                    justifyContent="space-between"
                                    alignItems="center"
                                >
                                    <Typography
                                        sx={{
                                            fontSize: 22,
                                            fontWeight: 600,
                                            lineHeight: 1.1,
                                        }}
                                    >
                                        {eventDetails.organizerName}
                                    </Typography>
                                    <Button
                                        variant="outlined"
                                        sx={{
                                            minWidth: 132,
                                            height: 30,
                                            borderRadius: 2,
                                            textTransform: "none",
                                            boxShadow: "none",
                                        }}
                                    >
                                        {eventDetails.secondaryActionLabel}
                                    </Button>
                                </Stack>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{ lineHeight: 1.5 }}
                                >
                                    {eventDetails.organizerDescription}
                                </Typography>
                                <Stack direction="row" spacing={1}>
                                    <IconButton
                                        size="small"
                                        sx={{
                                            bgcolor: "#F3F5F8",
                                            color: "#8B94A7",
                                        }}
                                    >
                                        <LanguageRounded
                                            sx={{ fontSize: 16 }}
                                        />
                                    </IconButton>
                                    <IconButton
                                        size="small"
                                        sx={{
                                            bgcolor: "#F3F5F8",
                                            color: "#8B94A7",
                                        }}
                                    >
                                        <Telegram sx={{ fontSize: 16 }} />
                                    </IconButton>
                                </Stack>
                            </Stack>
                        </Paper>

                        <Link
                            component={RouterLink}
                            to={generatePath(routePaths.organizer, {
                                id: String(eventDetails.organizerId),
                            })}
                            underline="hover"
                            sx={{
                                width: "fit-content",
                                color: "primary.main",
                                fontWeight: 500,
                            }}
                        >
                            Перейти к организатору
                        </Link>
                    </Stack>

                    <Stack spacing={1.5} sx={{ minWidth: 0, flex: 1 }}>
                        <Typography
                            variant="body2"
                            sx={{
                                color: "text.secondary",
                                fontWeight: 500,
                            }}
                        >
                            {eventDetails.aboutLabel}
                        </Typography>
                        <DetailsSectionDivider />
                        {eventDetails.description.map((paragraph, index) => (
                            <Typography
                                key={index}
                                sx={{
                                    fontSize: 16,
                                    lineHeight: 1.7,
                                    color: "text.primary",
                                }}
                            >
                                {paragraph}
                            </Typography>
                        ))}
                        <Button
                            variant="contained"
                            component={RouterLink}
                            to={generatePath(routePaths.project, {
                                id: String(eventDetails.projectId),
                            })}
                            sx={{
                                alignSelf: "flex-start",
                                minHeight: 46,
                                borderRadius: 1.5,
                                boxShadow: "none",
                                textTransform: "none",
                                fontWeight: 500,
                            }}
                        >
                            {eventDetails.primaryActionLabel}
                        </Button>
                    </Stack>
                </Stack>
            </Stack>
        </Paper>
    );
};

export default EventPage;
