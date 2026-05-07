import { Avatar, Button, Paper, Stack, Typography } from "@mui/material";

import { profileCardSx } from "./profileCardSx";

type ProfileEditHeaderProps = {
    initials: string;
    onCancel: () => void;
    onSave: () => void;
};

const ProfileEditHeader = ({
    initials,
    onCancel,
    onSave,
}: ProfileEditHeaderProps) => {
    return (
        <Paper elevation={0} sx={{ ...profileCardSx, bgcolor: "#FFFFFF" }}>
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
                        {initials}
                    </Avatar>

                    <Stack spacing={0.75}>
                        <Typography
                            sx={{
                                fontSize: { xs: 28, md: 34 },
                                fontWeight: 600,
                                lineHeight: 1.05,
                            }}
                        >
                            Редактор профиля
                        </Typography>
                        <Typography
                            sx={{
                                color: "text.secondary",
                                lineHeight: 1.6,
                                maxWidth: 640,
                            }}
                        >
                            Обновите основные данные, контакты и рабочие
                            интересы.
                        </Typography>
                    </Stack>
                </Stack>

                <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
                    <Button
                        variant="outlined"
                        onClick={onCancel}
                        sx={{
                            minWidth: 144,
                            borderRadius: 2,
                        }}
                    >
                        Отменить
                    </Button>
                    <Button
                        variant="contained"
                        onClick={onSave}
                        sx={{
                            minWidth: 172,
                            borderRadius: 2,
                            boxShadow: "none",
                        }}
                    >
                        Сохранить изменения
                    </Button>
                </Stack>
            </Stack>
        </Paper>
    );
};

export default ProfileEditHeader;
