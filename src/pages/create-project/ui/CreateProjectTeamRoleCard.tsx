import { DeleteOutlineRounded } from "@mui/icons-material";
import {
    Autocomplete,
    IconButton,
    MenuItem,
    Paper,
    Stack,
    TextField,
    Typography,
} from "@mui/material";

import type { TeamRole } from "../model/types";

import type { SkillDTO, TeamRoleDTO } from "@shared/api/generated/model";
import { fieldHelper } from "@shared/lib/form";

type TeamRoleCardErrors = {
    role?: string;
    requiredCount?: string;
};

type CreateProjectTeamRoleCardProps = {
    index: number;
    teamRole: TeamRole;
    availableRoles: TeamRoleDTO[];
    availableSkills: SkillDTO[];
    errors?: TeamRoleCardErrors;
    isRemoveDisabled: boolean;
    disabled?: boolean;
    onRemove: (roleId: number) => void;
    onRoleChange: (
        roleId: number,
        field: "role" | "description" | "requiredCount",
        value: string | number,
    ) => void;
    onSkillsChange: (roleId: number, skillIds: string[]) => void;
};

const CreateProjectTeamRoleCard = ({
    index,
    teamRole,
    availableRoles,
    availableSkills,
    errors,
    isRemoveDisabled,
    disabled = false,
    onRemove,
    onRoleChange,
    onSkillsChange,
}: CreateProjectTeamRoleCardProps) => {
    const selectedSkills = availableSkills.filter((skill) =>
        teamRole.skillIds.includes(skill.id),
    );

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
                    label="Количество мест"
                    type="number"
                    value={teamRole.requiredCount}
                    onChange={(event) =>
                        onRoleChange(
                            teamRole.id,
                            "requiredCount",
                            Number(event.target.value),
                        )
                    }
                    fullWidth
                    size="small"
                    disabled={disabled}
                    error={Boolean(errors?.requiredCount)}
                    helperText={fieldHelper(errors?.requiredCount)}
                    slotProps={{
                        htmlInput: {
                            min: 1,
                            step: 1,
                        },
                    }}
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
                    disabled={disabled}
                />

                <Stack spacing={1}>
                    <Typography
                        sx={{
                            fontSize: 14,
                            color: "text.secondary",
                        }}
                    >
                        Навыки
                    </Typography>
                    <Autocomplete
                        multiple
                        options={availableSkills}
                        getOptionLabel={(option) => option.name}
                        value={selectedSkills}
                        disabled={disabled}
                        onChange={(_, nextSkills) =>
                            onSkillsChange(
                                teamRole.id,
                                nextSkills.map((skill) => skill.id),
                            )
                        }
                        isOptionEqualToValue={(option, value) =>
                            option.id === value.id
                        }
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                placeholder="Выберите навыки"
                                size="small"
                            />
                        )}
                    />
                    <Typography
                        sx={{
                            fontSize: 12,
                            color: "text.secondary",
                        }}
                    >
                        Выберите навыки из справочника для этой роли.
                    </Typography>
                </Stack>
            </Stack>
        </Paper>
    );
};

export default CreateProjectTeamRoleCard;
