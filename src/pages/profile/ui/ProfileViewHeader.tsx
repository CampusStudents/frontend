import { EmailOutlined, LanguageRounded, Telegram } from "@mui/icons-material";
import { Avatar, Button, Link, Paper, Stack, Typography } from "@mui/material";

import type { ProfileDetails, ProfileStat } from "../model/types";

import { profileCardSx } from "./profileCardSx";

type ProfileViewHeaderProps = {
    details: ProfileDetails;
    stats: ProfileStat[];
    onEdit: () => void;
};

const ProfileViewHeader = ({
    details,
    stats,
    onEdit,
}: ProfileViewHeaderProps) => {
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
                                    fontSize: 16,
                                    color: "text.secondary",
                                }}
                            >
                                {details.role}
                            </Typography>
                            <Typography
                                sx={{
                                    fontSize: 14,
                                    color: "text.secondary",
                                }}
                            >
                                {`${details.city} | ${details.format} | ${details.university}`}
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
                    {details.bio}
                </Typography>

                <Stack
                    direction={{ xs: "column", md: "row" }}
                    spacing={2}
                    justifyContent="space-between"
                >
                    <Stack
                        direction="row"
                        alignItems="center"
                        flexWrap="nowrap"
                        useFlexGap={false}
                        sx={{ overflowX: "auto" }}
                    >
                        {stats.map((item, index) => (
                            <Typography
                                key={item.label}
                                component="span"
                                sx={{
                                    flexShrink: 0,
                                    fontSize: 16,
                                    lineHeight: 1.4,
                                    whiteSpace: "nowrap",
                                    color: "text.secondary",
                                }}
                            >
                                <Typography
                                    component="span"
                                    sx={{
                                        fontSize: 24,
                                        fontWeight: 600,
                                        lineHeight: 1.1,
                                        color: "text.primary",
                                        mr: 0.75,
                                    }}
                                >
                                    {item.value}
                                </Typography>
                                {item.label}
                                {index < stats.length - 1 ? (
                                    <Typography
                                        component="span"
                                        sx={{
                                            color: "divider",
                                            mx: 1.5,
                                        }}
                                    >
                                        |
                                    </Typography>
                                ) : null}
                            </Typography>
                        ))}
                    </Stack>

                    <Stack spacing={1}>
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
                        <Link
                            href={`https://t.me/${details.telegram.replace("@", "")}`}
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
                        <Link
                            href={`https://${details.portfolio}`}
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
                    </Stack>
                </Stack>
            </Stack>
        </Paper>
    );
};

export default ProfileViewHeader;
