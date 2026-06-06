import { Paper, Stack, TextField, Typography } from "@mui/material";

import type { ProfileDetails } from "../model/types";

import { profileCardSx } from "./profileCardSx";

type ProfileEditBasicsSectionProps = {
    details: ProfileDetails;
    onDetailsChange: (field: keyof ProfileDetails, value: string) => void;
};

const ProfileEditBasicsSection = ({
    details,
    onDetailsChange,
}: ProfileEditBasicsSectionProps) => {
    return (
        <Paper elevation={0} sx={{ ...profileCardSx, flex: 1.15 }}>
            <Stack spacing={2.5}>
                <Typography
                    sx={{
                        fontSize: 24,
                        fontWeight: 600,
                    }}
                >
                    Основное
                </Typography>

                <Stack spacing={2}>
                    <TextField
                        label="Имя и фамилия"
                        value={details.fullName}
                        onChange={(event) =>
                            onDetailsChange("fullName", event.target.value)
                        }
                        fullWidth
                        size="small"
                    />
                    <TextField
                        label="Город"
                        value={details.city}
                        onChange={(event) =>
                            onDetailsChange("city", event.target.value)
                        }
                        fullWidth
                        size="small"
                    />
                    <TextField
                        label="Учеба"
                        value={details.university}
                        onChange={(event) =>
                            onDetailsChange("university", event.target.value)
                        }
                        fullWidth
                        size="small"
                    />
                    <TextField
                        label="О себе"
                        value={details.bio}
                        onChange={(event) =>
                            onDetailsChange("bio", event.target.value)
                        }
                        fullWidth
                        multiline
                        minRows={5}
                        size="small"
                    />
                </Stack>
            </Stack>
        </Paper>
    );
};

export default ProfileEditBasicsSection;
