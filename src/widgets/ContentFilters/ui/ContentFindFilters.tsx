import { CloseRounded, SearchRounded, TuneRounded } from "@mui/icons-material";
import {
    Button,
    Chip,
    Collapse,
    IconButton,
    InputAdornment,
    Paper,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import { useState } from "react";

const interestOptions = ["Футбол", "Выставки", "Концерты"];

const ContentFindFilters = () => {
    const [isFiltersOpen, setIsFiltersOpen] = useState(false);
    const [interests, setInterests] = useState(interestOptions);

    const handleDeleteInterest = (interestToDelete: string) => {
        setInterests((currentInterests) =>
            currentInterests.filter(
                (interest) => interest !== interestToDelete,
            ),
        );
    };

    return (
        <Stack spacing={3}>
            <Stack
                direction={{ xs: "column", md: "row" }}
                spacing={2}
                alignItems={{ xs: "stretch", md: "center" }}
            >
                <TextField
                    fullWidth
                    placeholder="Поиск"
                    variant="standard"
                    slotProps={{
                        input: {
                            disableUnderline: true,
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchRounded
                                        sx={{
                                            color: "primary.main",
                                        }}
                                    />
                                </InputAdornment>
                            ),
                            sx: {
                                height: 50,
                                borderBottom: "1px solid",
                                borderColor: "divider",
                                pb: 0.5,
                            },
                        },
                    }}
                />
                <Stack direction="row" spacing={1.5}>
                    <IconButton
                        onClick={() => setIsFiltersOpen((current) => !current)}
                        sx={{
                            width: 48,
                            height: 48,
                            borderRadius: 1.5,
                            bgcolor: "background.paper",
                            border: "1px solid",
                            borderColor: isFiltersOpen
                                ? "primary.main"
                                : "transparent",
                        }}
                    >
                        <TuneRounded
                            sx={{
                                color: "primary.main",
                                fontSize: 20,
                            }}
                        />
                    </IconButton>
                    <Button
                        variant="contained"
                        sx={{
                            minWidth: 170,
                            height: 48,
                            borderRadius: 2,
                            boxShadow: "none",
                        }}
                    >
                        Найти
                    </Button>
                </Stack>
            </Stack>

            <Collapse in={isFiltersOpen} timeout="auto" unmountOnExit>
                <Paper
                    elevation={0}
                    sx={{
                        p: { xs: 2, md: 3 },
                        borderRadius: 2.5,
                        bgcolor: "background.paper",
                    }}
                >
                    <Stack spacing={2.5}>
                        <Typography
                            sx={{
                                fontSize: 24,
                                fontWeight: 600,
                            }}
                        >
                            Фильтры
                        </Typography>

                        <TextField
                            label="Имя"
                            placeholder="Super Mario"
                            fullWidth
                            size="small"
                        />
                        <TextField
                            label="Возраст"
                            placeholder="28 лет"
                            fullWidth
                            size="small"
                        />
                        <TextField
                            label="Пол"
                            placeholder="Мужской"
                            fullWidth
                            size="small"
                        />
                        <TextField
                            label="Город"
                            placeholder="Москва"
                            fullWidth
                            size="small"
                            sx={{ maxWidth: { md: 320 } }}
                        />
                        <TextField
                            label="Интересы"
                            placeholder="Выберите интересы"
                            fullWidth
                            size="small"
                            slotProps={{
                                input: {
                                    startAdornment: interests.length ? (
                                        <Stack
                                            direction="row"
                                            spacing={1}
                                            useFlexGap
                                            sx={{
                                                flexWrap: "wrap",
                                                py: 0.5,
                                            }}
                                        >
                                            {interests.map((interest) => (
                                                <Chip
                                                    key={interest}
                                                    label={interest}
                                                    size="small"
                                                    onDelete={() =>
                                                        handleDeleteInterest(
                                                            interest,
                                                        )
                                                    }
                                                    deleteIcon={
                                                        <CloseRounded
                                                            sx={{
                                                                fontSize: 16,
                                                            }}
                                                        />
                                                    }
                                                />
                                            ))}
                                        </Stack>
                                    ) : undefined,
                                },
                            }}
                            multiline
                            minRows={2}
                            sx={{ maxWidth: { md: 360 } }}
                        />

                        <Stack direction="row" spacing={2}>
                            <Button
                                variant="outlined"
                                onClick={() => {
                                    setInterests(interestOptions);
                                    setIsFiltersOpen(false);
                                }}
                                sx={{
                                    minWidth: 140,
                                    height: 40,
                                    borderRadius: 2,
                                }}
                            >
                                Отмена
                            </Button>
                            <Button
                                variant="contained"
                                sx={{
                                    minWidth: 140,
                                    height: 40,
                                    borderRadius: 2,
                                    boxShadow: "none",
                                }}
                            >
                                Применить
                            </Button>
                        </Stack>
                    </Stack>
                </Paper>
            </Collapse>
        </Stack>
    );
};

export default ContentFindFilters;
