import { useState } from "react";
import { CloseRounded, DeleteOutlineRounded } from "@mui/icons-material";
import {
    Chip,
    IconButton,
    MenuItem,
    Paper,
    Stack,
    TextField,
    Typography,
} from "@mui/material";

import type { TeamRole } from "../model/types";

import type { TeamRoleDTO } from "@shared/api/generated/model";
import { fieldHelper } from "@shared/lib/form";

type TeamRoleCardErrors = {
    role?: string;
};

type CreateProjectTeamRoleCardProps = {
    index: number;
    teamRole: TeamRole;
    availableRoles: TeamRoleDTO[];
    errors?: TeamRoleCardErrors;
    isRemoveDisabled: boolean;
    disabled?: boolean;
    onRemove: (roleId: number) => void;
    onRoleChange: (
        roleId: number,
        field: "role" | "description",
        value: string,
    ) => void;
    onAddTag: (roleId: number, tag: string) => void;
    onDeleteTag: (roleId: number, tagToDelete: string) => void;
};

const CreateProjectTeamRoleCard = ({
    index,
    teamRole,
    availableRoles,
    errors,
    isRemoveDisabled,
    disabled = false,
    onRemove,
    onRoleChange,
    onAddTag,
    onDeleteTag,
}: CreateProjectTeamRoleCardProps) => {
    const [tagValue, setTagValue] = useState("");

    const submitTag = () => {
        const trimmedTag = tagValue.trim();

        if (!trimmedTag) {
            return;
        }

        onAddTag(teamRole.id, trimmedTag);
        setTagValue("");
    };

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
                        disabled={disabled || isRemoveDisabled}
                        size="small"
                    >
                        <DeleteOutlineRounded />
                    </IconButton>
                </Stack>

                <TextField
                    label="Специализация"
                    select
                    value={teamRole.role}
                    onChange={(event) =>
                        onRoleChange(teamRole.id, "role", event.target.value)
                    }
                    fullWidth
                    size="small"
                    disabled={disabled}
                    error={Boolean(errors?.role)}
                    helperText={fieldHelper(errors?.role)}
                >
                    <MenuItem value="">Выберите роль</MenuItem>
                    {availableRoles.map((roleOption) => (
                        <MenuItem key={roleOption.id} value={roleOption.id}>
                            {roleOption.name}
                        </MenuItem>
                    ))}
                </TextField>
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
                    disabled={disabled}
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
                                onDelete={
                                    disabled
                                        ? undefined
                                        : () => onDeleteTag(teamRole.id, tag)
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
                    <TextField
                        value={tagValue}
                        onChange={(event) => setTagValue(event.target.value)}
                        onBlur={submitTag}
                        onKeyDown={(event) => {
                            if (event.key === "Enter" || event.key === ",") {
                                event.preventDefault();
                                submitTag();
                            }
                        }}
                        placeholder="Например: React, Next.js, UI/UX"
                        fullWidth
                        size="small"
                        disabled={disabled}
                    />
                </Stack>
            </Stack>
        </Paper>
    );
};

export default CreateProjectTeamRoleCard;
