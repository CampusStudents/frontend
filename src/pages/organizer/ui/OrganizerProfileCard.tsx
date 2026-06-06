import { LanguageRounded, Telegram } from "@mui/icons-material";
import {
    Avatar,
    AvatarGroup,
    Box,
    Button,
    IconButton,
    Paper,
    Stack,
    Typography,
} from "@mui/material";

import { organizerProfile } from "../model/mockData";

export const OrganizerProfileCard = () => {
    return (
        <Paper
            elevation={0}
            sx={{
                overflow: "hidden",
                borderRadius: 1.5,
            }}
        >
            <Box
                sx={{
                    height: { xs: 140, md: 182 },
                    bgcolor: "#050505",
                }}
            />

            <Box
                sx={{
                    px: { xs: 2.5, md: 4 },
                    pt: { xs: 1.75, md: 2.25 },
                    pb: { xs: 3, md: 4 },
                }}
            >
                <Stack spacing={2.5}>
                    <Stack
                        direction={{ xs: "column", md: "row" }}
                        spacing={2}
                        justifyContent="space-between"
                        alignItems={{ xs: "flex-start", md: "flex-start" }}
                    >
                        <Stack
                            direction={{ xs: "column", sm: "row" }}
                            spacing={2}
                            alignItems={{ xs: "flex-start", sm: "flex-start" }}
                        >
                            <Box
                                sx={{
                                    width: 56,
                                    height: 56,
                                    borderRadius: 1.5,
                                    bgcolor: "#101010",
                                    color: "#FFFFFF",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontSize: 15,
                                    fontWeight: 700,
                                    border: "2px solid #FFFFFF",
                                    mt: { xs: -5, md: -6.5 },
                                    position: "relative",
                                    zIndex: 1,
                                    flexShrink: 0,
                                }}
                            >
                                СМ
                            </Box>

                            <Stack spacing={1}>
                                <Typography
                                    sx={{
                                        fontSize: { xs: 22, md: 26 },
                                        fontWeight: 600,
                                        lineHeight: 1.15,
                                    }}
                                >
                                    {organizerProfile.name}
                                </Typography>
                                <Typography
                                    sx={{
                                        maxWidth: 700,
                                        color: "text.secondary",
                                        lineHeight: 1.45,
                                        fontSize: 14,
                                    }}
                                >
                                    {organizerProfile.description}
                                </Typography>
                                <Stack direction="row" spacing={1}>
                                    <IconButton
                                        sx={{
                                            width: 28,
                                            height: 28,
                                            borderRadius: 1,
                                            bgcolor: "#F3F5F8",
                                            color: "#8B94A7",
                                        }}
                                    >
                                        <LanguageRounded
                                            sx={{ fontSize: 16 }}
                                        />
                                    </IconButton>
                                    <IconButton
                                        sx={{
                                            width: 28,
                                            height: 28,
                                            borderRadius: 1,
                                            bgcolor: "#F3F5F8",
                                            color: "#8B94A7",
                                        }}
                                    >
                                        <Telegram sx={{ fontSize: 16 }} />
                                    </IconButton>
                                </Stack>
                            </Stack>
                        </Stack>

                        <Button
                            variant="contained"
                            sx={{
                                minWidth: 120,
                                height: 32,
                                borderRadius: 2,
                                boxShadow: "none",
                                px: 2.25,
                                mt: { md: 1.5 },
                            }}
                        >
                            Подписаться
                        </Button>
                    </Stack>

                    <Stack
                        direction="row"
                        spacing={1.5}
                        alignItems="center"
                        flexWrap="wrap"
                        useFlexGap
                        sx={{
                            pt: 2,
                            borderTop: "1px solid #EEF1F5",
                        }}
                    >
                        <Stack
                            direction="row"
                            spacing={1.5}
                            alignItems="center"
                        >
                            <AvatarGroup
                                max={4}
                                sx={{
                                    "& .MuiAvatar-root": {
                                        width: 28,
                                        height: 28,
                                        fontSize: 11,
                                        borderColor: "#FFFFFF",
                                    },
                                }}
                            >
                                <Avatar sx={{ bgcolor: "#1F6FEB" }}>A</Avatar>
                                <Avatar sx={{ bgcolor: "#F97316" }}>B</Avatar>
                                <Avatar sx={{ bgcolor: "#14B8A6" }}>C</Avatar>
                                <Avatar sx={{ bgcolor: "#6366F1" }}>D</Avatar>
                            </AvatarGroup>
                            <Typography
                                sx={{
                                    color: "text.secondary",
                                    fontWeight: 500,
                                    fontSize: 14,
                                }}
                            >
                                {organizerProfile.followersText}
                            </Typography>
                        </Stack>
                    </Stack>
                </Stack>
            </Box>
        </Paper>
    );
};
