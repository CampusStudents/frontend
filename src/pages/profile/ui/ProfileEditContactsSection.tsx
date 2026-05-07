import { EmailOutlined, LanguageRounded, Telegram } from "@mui/icons-material";
import { Divider, Paper, Stack, TextField, Typography } from "@mui/material";

import type { ProfileDetails } from "../model/types";

import { profileCardSx } from "./profileCardSx";

type ProfileEditContactsSectionProps = {
    details: ProfileDetails;
    status: string;
    onDetailsChange: (field: keyof ProfileDetails, value: string) => void;
    onStatusChange: (value: string) => void;
};

const ProfileEditContactsSection = ({
    details,
    status,
    onDetailsChange,
    onStatusChange,
}: ProfileEditContactsSectionProps) => {
    return (
        <Paper elevation={0} sx={{ ...profileCardSx, flex: 0.85 }}>
            <Stack spacing={2.5}>
                <Typography
                    sx={{
                        fontSize: 24,
                        fontWeight: 600,
                    }}
                >
                    Контакты
                </Typography>

                <Stack spacing={2}>
                    <TextField
                        label="Email"
                        value={details.email}
                        onChange={(event) =>
                            onDetailsChange("email", event.target.value)
                        }
                        size="small"
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <EmailOutlined
                                        sx={{
                                            mr: 1,
                                            color: "text.secondary",
                                            fontSize: 18,
                                        }}
                                    />
                                ),
                            },
                        }}
                    />
                    <TextField
                        label="Telegram"
                        value={details.telegram}
                        onChange={(event) =>
                            onDetailsChange("telegram", event.target.value)
                        }
                        size="small"
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <Telegram
                                        sx={{
                                            mr: 1,
                                            color: "text.secondary",
                                            fontSize: 18,
                                        }}
                                    />
                                ),
                            },
                        }}
                    />
                    <TextField
                        label="Портфолио"
                        value={details.portfolio}
                        onChange={(event) =>
                            onDetailsChange("portfolio", event.target.value)
                        }
                        size="small"
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <LanguageRounded
                                        sx={{
                                            mr: 1,
                                            color: "text.secondary",
                                            fontSize: 18,
                                        }}
                                    />
                                ),
                            },
                        }}
                    />
                </Stack>

                <Divider />

                <Stack spacing={1.5}>
                    <Typography
                        sx={{
                            fontSize: 24,
                            fontWeight: 600,
                        }}
                    >
                        Статус
                    </Typography>
                    <TextField
                        value={status}
                        onChange={(event) => onStatusChange(event.target.value)}
                        fullWidth
                        multiline
                        minRows={4}
                        size="small"
                    />
                </Stack>
            </Stack>
        </Paper>
    );
};

export default ProfileEditContactsSection;
