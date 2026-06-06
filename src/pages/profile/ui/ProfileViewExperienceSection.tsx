import { Divider, Paper, Stack, Typography } from "@mui/material";

import type { ProfileTimelineItem } from "../model/types";

import { profileCardSx } from "./profileCardSx";

type ProfileViewExperienceSectionProps = {
    timeline: ProfileTimelineItem[];
};

const ProfileViewExperienceSection = ({
    timeline,
}: ProfileViewExperienceSectionProps) => {
    return (
        <Paper elevation={0} sx={{ ...profileCardSx, flex: 1.1 }}>
            <Stack spacing={2.5}>
                <Typography
                    sx={{
                        fontSize: 24,
                        fontWeight: 600,
                    }}
                >
                    Опыт
                </Typography>

                <Stack spacing={2}>
                    {timeline.map((item, index) => (
                        <Stack key={item.title} spacing={1.25}>
                            <Stack
                                direction={{ xs: "column", sm: "row" }}
                                justifyContent="space-between"
                                spacing={0.75}
                            >
                                <Typography
                                    sx={{
                                        fontSize: 18,
                                        fontWeight: 600,
                                    }}
                                >
                                    {item.title}
                                </Typography>
                                <Typography
                                    sx={{
                                        color: "text.secondary",
                                        fontSize: 14,
                                    }}
                                >
                                    {item.period}
                                </Typography>
                            </Stack>
                            <Typography
                                sx={{
                                    color: "text.secondary",
                                    lineHeight: 1.6,
                                }}
                            >
                                {item.description}
                            </Typography>
                            {index < timeline.length - 1 ? (
                                <Divider sx={{ pt: 1 }} />
                            ) : null}
                        </Stack>
                    ))}
                </Stack>
            </Stack>
        </Paper>
    );
};

export default ProfileViewExperienceSection;
