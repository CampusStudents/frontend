import { CloseRounded, DeleteOutlineRounded } from "@mui/icons-material";
import {
    Chip,
    IconButton,
    Paper,
    Stack,
    TextField,
    Typography,
} from "@mui/material";

import type { TeamRole } from "../model/types";

type CreateProjectTeamRoleCardProps = {
    index: number;
    teamRole: TeamRole;
    isRemoveDisabled: boolean;
    onRemove: (roleId: number) => void;
    onRoleChange: (
        roleId: number,
        field: "role" | "description",
        value: string,
    ) => void;
    onDeleteTag: (roleId: number, tagToDelete: string) => void;
};

const CreateProjectTeamRoleCard = ({
    index,
    teamRole,
    isRemoveDisabled,
    onRemove,
    onRoleChange,
    onDeleteTag,
}: CreateProjectTeamRoleCardProps) => {
    return (
        <Paper
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
                    alignItems="center"
                    justifyContent="space-between"
                >
                    <Typography
                        sx={{
                            fontSize: 18,
                            fontWeight: 600,
                        }}
                    >
                        {`Роль ${index + 1}`}
                    </Typography>
                    <IconButton
                        onClick={() => onRemove(teamRole.id)}
                        disabled={isRemoveDisabled}
                        size="small"
                    >
                        <DeleteOutlineRounded />
                    </IconButton>
                </Stack>

                <TextField
                    label="Специализация"
                    placeholder="Frontend"
                    value={teamRole.role}
                    onChange={(event) =>
                        onRoleChange(teamRole.id, "role", event.target.value)
                    }
                    fullWidth
                    size="small"
                />
                <TextField
                    label="Описание"
                    placeholder="Опишите, кого вы ищете и какие задачи будут у участника."
                    value={teamRole.description}
                    onChange={(event) =>
                        onRoleChange(
                            teamRole.id,
                            "description",
                            event.target.value,
                        )
                    }
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
                        Теги
                    </Typography>
                    <Stack
                        direction="row"
                        spacing={1}
                        useFlexGap
                        sx={{ flexWrap: "wrap" }}
                    >
                        {teamRole.tags.map((tag) => (
                            <Chip
                                key={`${teamRole.id}-${tag}`}
                                label={tag}
                                size="small"
                                onDelete={() => onDeleteTag(teamRole.id, tag)}
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
                    <TextField
                        placeholder="Например: React, Next.js, UI/UX"
                        fullWidth
                        size="small"
                    />
                </Stack>
            </Stack>
        </Paper>
    );
};

export default CreateProjectTeamRoleCard;
