import { Chip, Divider, Paper, Stack, Typography } from "@mui/material";

import { profileCardSx } from "./profileCardSx";

type ProfileViewSidebarProps = {
    skills: string[];
    interests: string[];
    status: string;
};

const ProfileViewSidebar = ({
    skills,
    interests,
    status,
}: ProfileViewSidebarProps) => {
    return (
        <Paper elevation={0} sx={{ ...profileCardSx, flex: 0.9 }}>
            <Stack spacing={3}>
                <Stack spacing={2}>
                    <Typography
                        sx={{
                            fontSize: 24,
                            fontWeight: 600,
                        }}
                    >
                        Навыки
                    </Typography>
                    <Stack
                        direction="row"
                        spacing={1}
                        flexWrap="wrap"
                        useFlexGap
                    >
                        {skills.map((skill) => (
                            <Chip
                                key={skill}
                                label={skill}
                                sx={{
                                    borderRadius: 1.5,
                                    bgcolor: "#F4F6FA",
                                }}
                            />
                        ))}
                    </Stack>
                </Stack>

                <Divider />

                <Stack spacing={2}>
                    <Typography
                        sx={{
                            fontSize: 24,
                            fontWeight: 600,
                        }}
                    >
                        Интересы
                    </Typography>
                    <Stack spacing={1.25}>
                        {interests.map((interest) => (
                            <Typography
                                key={interest}
                                sx={{
                                    color: "text.secondary",
                                    lineHeight: 1.55,
                                }}
                            >
                                {interest}
                            </Typography>
                        ))}
                    </Stack>
                </Stack>

                <Divider />

                <Stack spacing={1}>
                    <Typography
                        sx={{
                            fontSize: 24,
                            fontWeight: 600,
                        }}
                    >
                        Статус
                    </Typography>
                    <Typography
                        sx={{
                            color: "text.secondary",
                            lineHeight: 1.6,
                        }}
                    >
                        {status}
                    </Typography>
                </Stack>
            </Stack>
        </Paper>
    );
};

export default ProfileViewSidebar;
