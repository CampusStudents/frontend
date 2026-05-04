import { AddRounded, DeleteOutlineRounded } from "@mui/icons-material";
import {
    Button,
    IconButton,
    Paper,
    Stack,
    TextField,
    Typography,
} from "@mui/material";

import type { ProfileTimelineItem } from "../model/types";

type ProfileTimelineEditorProps = {
    items: ProfileTimelineItem[];
    onAdd: () => void;
    onRemove: (index: number) => void;
    onChange: (
        index: number,
        field: keyof ProfileTimelineItem,
        value: string,
    ) => void;
};

const ProfileTimelineEditor = ({
    items,
    onAdd,
    onRemove,
    onChange,
}: ProfileTimelineEditorProps) => {
    return (
        <Stack spacing={2}>
            {items.map((item, index) => (
                <Paper
                    key={`${item.title}-${item.period}-${index}`}
                    elevation={0}
                    sx={{
                        p: { xs: 2, md: 2.5 },
                        borderRadius: 2,
                        bgcolor: "#FBFCFE",
                        border: "1px solid",
                        borderColor: "divider",
                    }}
                >
                    <Stack spacing={2}>
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                        >
                            <Typography
                                sx={{
                                    fontSize: 18,
                                    fontWeight: 600,
                                }}
                            >
                                {`Позиция ${index + 1}`}
                            </Typography>
                            <IconButton
                                onClick={() => onRemove(index)}
                                disabled={items.length === 1}
                                size="small"
                            >
                                <DeleteOutlineRounded />
                            </IconButton>
                        </Stack>

                        <TextField
                            label="Название"
                            value={item.title}
                            onChange={(event) =>
                                onChange(index, "title", event.target.value)
                            }
                            fullWidth
                            size="small"
                        />
                        <TextField
                            label="Период"
                            value={item.period}
                            onChange={(event) =>
                                onChange(index, "period", event.target.value)
                            }
                            placeholder="2025 - сейчас"
                            fullWidth
                            size="small"
                        />
                        <TextField
                            label="Описание"
                            value={item.description}
                            onChange={(event) =>
                                onChange(
                                    index,
                                    "description",
                                    event.target.value,
                                )
                            }
                            fullWidth
                            multiline
                            minRows={4}
                            size="small"
                        />
                    </Stack>
                </Paper>
            ))}

            <Button
                variant="outlined"
                startIcon={<AddRounded />}
                onClick={onAdd}
                sx={{
                    alignSelf: "flex-start",
                    borderRadius: 2,
                }}
            >
                Добавить позицию
            </Button>
        </Stack>
    );
};

export default ProfileTimelineEditor;
