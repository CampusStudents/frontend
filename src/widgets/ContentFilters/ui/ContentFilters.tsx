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
    ToggleButton,
    ToggleButtonGroup,
    Typography,
} from "@mui/material";
import { useState } from "react";

type ContentFiltersProps = {
    selectedView?: string;
    projectCount?: number;
    eventCount?: number;
};

const ContentFilters = ({
    selectedView = "projects",
    projectCount = 124,
    eventCount = 38,
}: ContentFiltersProps) => {
    const [isFiltersOpen, setIsFiltersOpen] = useState(false);
    const [stackTags, setStackTags] = useState([
        "React",
        "TypeScript",
        "Next.js",
    ]);

    const handleDeleteStackTag = (tagToDelete: string) => {
        setStackTags((currentTags) =>
            currentTags.filter((tag) => tag !== tagToDelete),
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
                            label="Название"
                            placeholder="Воркшоп Т-Банк"
                            fullWidth
                            size="small"
                        />
                        <TextField
                            label="Компания или направление"
                            placeholder="Стажировка Т-Банк"
                            fullWidth
                            size="small"
                        />
                        <TextField
                            label="Роль или стек"
                            placeholder="Frontend, Fullstack (Next + Nest)"
                            fullWidth
                            size="small"
                        />
                        <TextField
                            label="Формат и город"
                            placeholder="Москва | Offline"
                            fullWidth
                            size="small"
                            sx={{ maxWidth: { md: 320 } }}
                        />
                        <TextField
                            label="Технологии"
                            placeholder="Выберите технологии"
                            fullWidth
                            size="small"
                            slotProps={{
                                input: {
                                    startAdornment: stackTags.length ? (
                                        <Stack
                                            direction="row"
                                            spacing={1}
                                            useFlexGap
                                            sx={{
                                                flexWrap: "wrap",
                                                py: 0.5,
                                            }}
                                        >
                                            {stackTags.map((tag) => (
                                                <Chip
                                                    key={tag}
                                                    label={tag}
                                                    size="small"
                                                    onDelete={() =>
                                                        handleDeleteStackTag(
                                                            tag,
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
                                    setStackTags([
                                        "React",
                                        "TypeScript",
                                        "Next.js",
                                    ]);
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

            <ToggleButtonGroup
                value={selectedView}
                exclusive
                sx={{
                    width: "fit-content",
                    alignSelf: "flex-start",
                    "& .MuiToggleButton-root": {
                        px: 2.5,
                        borderRadius: 2,
                    },
                }}
            >
                <ToggleButton value="projects">
                    {`Проекты (${projectCount})`}
                </ToggleButton>
                <ToggleButton value="events">
                    {`Мероприятия (${eventCount})`}
                </ToggleButton>
            </ToggleButtonGroup>
        </Stack>
    );
};

export default ContentFilters;
