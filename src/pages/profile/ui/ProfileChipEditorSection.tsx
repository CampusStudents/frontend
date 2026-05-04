import { AddRounded, CloseRounded } from "@mui/icons-material";
import { Button, Chip, Stack, TextField, Typography } from "@mui/material";

type ProfileChipEditorSectionProps = {
    title: string;
    items: string[];
    inputLabel: string;
    inputValue: string;
    onInputChange: (value: string) => void;
    onAdd: () => void;
    onRemove: (value: string) => void;
};

const ProfileChipEditorSection = ({
    title,
    items,
    inputLabel,
    inputValue,
    onInputChange,
    onAdd,
    onRemove,
}: ProfileChipEditorSectionProps) => {
    return (
        <Stack spacing={2}>
            <Typography
                sx={{
                    fontSize: 24,
                    fontWeight: 600,
                }}
            >
                {title}
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                {items.map((item) => (
                    <Chip
                        key={item}
                        label={item}
                        onDelete={() => onRemove(item)}
                        deleteIcon={<CloseRounded sx={{ fontSize: 16 }} />}
                        sx={{
                            borderRadius: 1.5,
                            bgcolor: "#F4F6FA",
                        }}
                    />
                ))}
            </Stack>
            <Stack direction={{ xs: "column", md: "row" }} spacing={1.5}>
                <TextField
                    label={inputLabel}
                    value={inputValue}
                    onChange={(event) => onInputChange(event.target.value)}
                    onKeyDown={(event) => {
                        if (event.key === "Enter") {
                            event.preventDefault();
                            onAdd();
                        }
                    }}
                    fullWidth
                    size="small"
                />
                <Button
                    variant="outlined"
                    startIcon={<AddRounded />}
                    onClick={onAdd}
                    sx={{
                        minWidth: 168,
                        borderRadius: 2,
                    }}
                >
                    Добавить
                </Button>
            </Stack>
        </Stack>
    );
};

export default ProfileChipEditorSection;
