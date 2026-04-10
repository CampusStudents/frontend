import { ChevronLeftRounded, ChevronRightRounded } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import type { ReactNode } from "react";
import { A11y } from "swiper/modules";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";

import "swiper/css";

type DetailsCarouselProps<T> = {
    items: T[];
    getKey: (item: T) => string | number;
    renderSlide: (item: T) => ReactNode;
    breakpoints?: Record<
        number,
        { slidesPerView: number; spaceBetween?: number }
    >;
    slidesPerView?: number;
    spaceBetween?: number;
};

type CarouselArrowProps = {
    direction: "prev" | "next";
};

const CarouselArrow = ({ direction }: CarouselArrowProps) => {
    const swiper = useSwiper();

    return (
        <IconButton
            aria-label={
                direction === "prev" ? "Предыдущий слайд" : "Следующий слайд"
            }
            onClick={() =>
                direction === "prev" ? swiper.slidePrev() : swiper.slideNext()
            }
            sx={{
                position: "absolute",
                top: "50%",
                [direction === "prev" ? "left" : "right"]: 12,
                transform: "translateY(-50%)",
                zIndex: 2,
                width: 36,
                height: 36,
                borderRadius: 1,
                bgcolor: "rgba(255, 255, 255, 0.92)",
                color: "text.primary",
                border: "1px solid",
                borderColor: "divider",
                boxShadow: "0 10px 24px rgba(19, 21, 23, 0.08)",
                opacity: 0,
                transition:
                    "opacity 180ms ease, background-color 180ms ease, transform 180ms ease",
                pointerEvents: "none",
                ".details-carousel:hover &": {
                    opacity: 1,
                    pointerEvents: "auto",
                },
                "&:hover": {
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) scale(1.03)",
                },
            }}
        >
            {direction === "prev" ? (
                <ChevronLeftRounded sx={{ fontSize: 20 }} />
            ) : (
                <ChevronRightRounded sx={{ fontSize: 20 }} />
            )}
        </IconButton>
    );
};

const DetailsCarousel = <T,>({
    items,
    getKey,
    renderSlide,
    breakpoints,
    slidesPerView = 1,
    spaceBetween = 16,
}: DetailsCarouselProps<T>) => {
    return (
        <Box
            className="details-carousel"
            sx={{
                overflow: "hidden",
                position: "relative",
                "& .swiper": {
                    overflow: "hidden",
                },
            }}
        >
            <Swiper
                modules={[A11y]}
                a11y={{ enabled: true }}
                slidesPerView={slidesPerView}
                spaceBetween={spaceBetween}
                breakpoints={breakpoints}
            >
                <CarouselArrow direction="prev" />
                <CarouselArrow direction="next" />
                {items.map((item) => (
                    <SwiperSlide key={getKey(item)}>
                        {renderSlide(item)}
                    </SwiperSlide>
                ))}
            </Swiper>
        </Box>
    );
};

export default DetailsCarousel;
