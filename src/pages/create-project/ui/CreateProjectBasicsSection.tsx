import { ImageOutlined } from "@mui/icons-material";
import { Box, Stack, TextField, Typography } from "@mui/material";

const CreateProjectBasicsSection = () => {
    return (
        <Stack spacing={2.5}>
            <Typography
                sx={{
                    fontSize: { xs: 28, md: 34 },
                    fontWeight: 600,
                    lineHeight: 1.1,
                }}
            >
                Создание проекта
            </Typography>

            <Stack spacing={2}>
                <TextField
                    label="Название проекта"
                    placeholder="Super Mario"
                    fullWidth
                    size="small"
                />
                <TextField
                    label="Дата"
                    placeholder="14 февраля"
                    fullWidth
                    size="small"
                />
                <TextField
                    label="Описание"
                    placeholder="Расскажите кратко о проекте, цели и формате участия."
                    fullWidth
                    multiline
                    minRows={4}
                    size="small"
                />

                <Stack spacing={1}>
                    <Typography
                        sx={{
                            fontSize: 14,
                            color: "text.secondary",
                        }}
                    >
                        Изображение
                    </Typography>
                    <Box
                        sx={{
                            width: { xs: "100%", sm: 220 },
                            height: 140,
                            borderRadius: 2,
                            border: "1px dashed",
                            borderColor: "divider",
                            bgcolor: "#F8FAFD",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "text.secondary",
                        }}
                    >
                        <Stack spacing={1} alignItems="center">
                            <ImageOutlined />
                            <Typography variant="body2">
                                Загрузить обложку
                            </Typography>
                        </Stack>
                    </Box>
                </Stack>

                <Stack
                    direction={{ xs: "column", md: "row" }}
                    spacing={2}
                    alignItems={{ xs: "stretch", md: "center" }}
                >
                    <TextField
                        label="Город"
                        placeholder="Москва"
                        fullWidth
                        size="small"
                        sx={{ maxWidth: { md: 320 } }}
                    />
                    <TextField
                        label="Формат"
                        placeholder="Онлайн / Оффлайн"
                        fullWidth
                        size="small"
                        sx={{ maxWidth: { md: 240 } }}
                    />
                </Stack>
            </Stack>
        </Stack>
    );
};

export default CreateProjectBasicsSection;
