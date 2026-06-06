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

type OrganizerProfileCardProps = {
    name?: string;
    description?: string | null;
    contactEmail?: string | null;
    imageUrl?: string | null;
};

export const OrganizerProfileCard = ({
    name = organizerProfile.name,
    description = organizerProfile.description,
    contactEmail,
    imageUrl,
}: OrganizerProfileCardProps) => {
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
                    backgroundImage: imageUrl ? `url(${imageUrl})` : undefined,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
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
                                    {name}
                                </Typography>
                                <Typography
                                    sx={{
                                        maxWidth: 700,
                                        color: "text.secondary",
                                        lineHeight: 1.45,
                                        fontSize: 14,
                                    }}
                                >
                                    {description ||
                                        "Описание пока не заполнено."}
                                </Typography>
                                {contactEmail ? (
                                    <Typography
                                        sx={{
                                            color: "text.secondary",
                                            lineHeight: 1.45,
                                            fontSize: 14,
                                        }}
                                    >
                                        {contactEmail}
                                    </Typography>
                                ) : null}
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
                    </Stack>


                </Stack>
            </Box>
        </Paper>
    );
};
