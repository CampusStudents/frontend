import { EmailOutlined, LanguageRounded, Telegram } from "@mui/icons-material";
import { Avatar, Button, Link, Paper, Stack, Typography } from "@mui/material";

import type { ProfileDetails } from "../model/types";

import { profileCardSx } from "./profileCardSx";

type ProfileViewHeaderProps = {
    details: ProfileDetails;
    onEdit: () => void;
};

const ProfileViewHeader = ({ details, onEdit }: ProfileViewHeaderProps) => {
    const portfolioHref = /^https?:\/\//.test(details.portfolio)
        ? details.portfolio
        : `https://${details.portfolio}`;
    const telegramLogin = details.telegram.replace("@", "");

    return (
        <Paper elevation={0} sx={{ ...profileCardSx, bgcolor: "#FFFFFF" }}>
            <Stack spacing={3}>
                <Stack
                    direction={{ xs: "column", md: "row" }}
                    spacing={3}
                    justifyContent="space-between"
                    alignItems={{ xs: "flex-start", md: "center" }}
                >
                    <Stack
                        direction={{ xs: "column", sm: "row" }}
                        spacing={2}
                        alignItems={{ xs: "flex-start", sm: "center" }}
                    >
                        <Avatar
                            sx={{
                                width: 72,
                                height: 72,
                                bgcolor: "#0E1628",
                                fontSize: 24,
                                fontWeight: 700,
                            }}
                        >
                            {details.initials}
                        </Avatar>

                        <Stack spacing={0.75}>
                            <Typography
                                sx={{
                                    fontSize: { xs: 28, md: 34 },
                                    fontWeight: 600,
                                    lineHeight: 1.05,
                                }}
                            >
                                {details.fullName}
                            </Typography>
                            <Typography
                                sx={{
                                    fontSize: 14,
                                    color: "text.secondary",
                                }}
                            >
                                {[details.city, details.university]
                                    .filter(Boolean)
                                    .join(" | ")}
                            </Typography>
                        </Stack>
                    </Stack>

                    <Button
                        variant="outlined"
                        onClick={onEdit}
                        sx={{
                            minWidth: 156,
                            borderRadius: 2,
                        }}
                    >
                        Редактировать
                    </Button>
                </Stack>

                <Typography
                    sx={{
                        maxWidth: 760,
                        color: "text.secondary",
                        lineHeight: 1.6,
                    }}
                >
                    {details.bio || "Описание пока не заполнено."}
                </Typography>

                <Stack spacing={1} alignItems="flex-start">
                    <Link
                        href={`mailto:${details.email}`}
                        underline="hover"
                        color="text.secondary"
                        sx={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 1,
                        }}
                    >
                        <EmailOutlined sx={{ fontSize: 18 }} />
                        {details.email}
                    </Link>
                    {details.telegram ? (
                        <Link
                            href={`https://t.me/${telegramLogin}`}
                            underline="hover"
                            color="text.secondary"
                            sx={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: 1,
                            }}
                        >
                            <Telegram sx={{ fontSize: 18 }} />
                            {details.telegram}
                        </Link>
                    ) : null}
                    {details.portfolio ? (
                        <Link
                            href={portfolioHref}
                            underline="hover"
                            color="text.secondary"
                            sx={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: 1,
                            }}
                        >
                            <LanguageRounded sx={{ fontSize: 18 }} />
                            {details.portfolio}
                        </Link>
                    ) : null}
                </Stack>
            </Stack>
        </Paper>
    );
};

export default ProfileViewHeader;
