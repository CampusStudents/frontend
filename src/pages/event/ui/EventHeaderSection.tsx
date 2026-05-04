import { Paper, Typography } from "@mui/material";

import type { EventDetails } from "../model/types";

import { DetailsCarousel } from "@widgets/DetailSections";

type EventHeaderSectionProps = {
    details: EventDetails;
};

const EventHeaderSection = ({ details }: EventHeaderSectionProps) => {
    return (
        <>
            <Typography
                sx={{
                    fontSize: { xs: 30, md: 38 },
                    fontWeight: 600,
                    lineHeight: 1.1,
                }}
            >
                {details.title}
            </Typography>

            <DetailsCarousel
                items={details.gallery}
                getKey={(image) => image}
                renderSlide={(image) => {
                    const index = details.gallery.indexOf(image);

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
        </>
    );
};

export default EventHeaderSection;
