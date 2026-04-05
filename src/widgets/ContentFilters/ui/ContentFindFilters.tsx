import { SearchRounded, TuneRounded } from "@mui/icons-material";
import {
    Button,
    IconButton,
    InputAdornment,
    Stack,
    TextField,
} from "@mui/material";

const ContentFindFilters = () => {
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
                        sx={{
                            width: 48,
                            height: 48,
                            borderRadius: 1.5,
                            bgcolor: "background.paper",
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
        </Stack>
    );
};

export default ContentFindFilters;
