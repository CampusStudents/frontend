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

import type { EventDetails } from "../model/types";

import {
    DetailsDateBadge,
    DetailsLocationBadge,
} from "@widgets/DetailSections";
import { routePaths } from "@shared/config";

type EventSidebarProps = {
    details: EventDetails;
    isSubscribed: boolean;
    onSubscribe: () => void;
};

const EventSidebar = ({
    details,
    isSubscribed,
    onSubscribe,
}: EventSidebarProps) => {
    return (
        <Stack
            spacing={1.5}
            sx={{
                width: { xs: "100%", lg: 320 },
                flexShrink: 0,
            }}
        >
            <Stack direction="row" spacing={1.25} alignItems="flex-start">
                <DetailsDateBadge day={details.day} month={details.month} />
                <Stack spacing={0.25}>
                    <Typography sx={{ fontWeight: 500 }}>
                        {details.dateLabel}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {details.timeLabel}
                    </Typography>
                </Stack>
            </Stack>

            <Stack direction="row" spacing={1.25} alignItems="flex-start">
                <DetailsLocationBadge />
                <Stack spacing={0.25}>
                    <Stack direction="row" spacing={0.5} alignItems="center">
                        <Typography sx={{ fontWeight: 500 }}>
                            {details.locationName}
                        </Typography>
                        <NorthEastRounded
                            sx={{
                                fontSize: 16,
                                color: "text.secondary",
                            }}
                        />
                    </Stack>
                    <Typography variant="body2" color="text.secondary">
                        {details.address}
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
                        {details.organizerLabel}
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
                            {details.organizerName}
                        </Typography>
                        <Button
                            variant="outlined"
                            onClick={onSubscribe}
                            disabled={isSubscribed}
                            sx={{
                                minWidth: 132,
                                height: 30,
                                borderRadius: 2,
                                textTransform: "none",
                                boxShadow: "none",
                                "&.Mui-disabled": {
                                    color: "primary.main",
                                    borderColor: "primary.main",
                                },
                            }}
                        >
                            {isSubscribed
                                ? "Подписка оформлена"
                                : details.secondaryActionLabel}
                        </Button>
                    </Stack>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ lineHeight: 1.5 }}
                    >
                        {details.organizerDescription}
                    </Typography>
                    <Stack direction="row" spacing={1}>
                        <IconButton
                            size="small"
                            sx={{
                                bgcolor: "#F3F5F8",
                                color: "#8B94A7",
                            }}
                        >
                            <LanguageRounded sx={{ fontSize: 16 }} />
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
                    id: String(details.organizerId),
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
    );
};

export default EventSidebar;
