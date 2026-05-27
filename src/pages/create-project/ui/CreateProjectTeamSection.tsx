import { AddRounded } from "@mui/icons-material";
import { Button, Stack, Typography } from "@mui/material";

import type { TeamRole, TeamRoleErrors } from "../model/types";

import CreateProjectTeamRoleCard from "./CreateProjectTeamRoleCard";

import type { TeamRoleDTO } from "@shared/api/generated/model";

type CreateProjectTeamSectionProps = {
    teamRoles: TeamRole[];
    availableRoles: TeamRoleDTO[];
    roleErrors?: Record<number, TeamRoleErrors>;
    disabled?: boolean;
    onAddRole: () => void;
    onRemoveRole: (roleId: number) => void;
    onRoleChange: (
        roleId: number,
        field: "role" | "description",
        value: string,
    ) => void;
    onAddTag: (roleId: number, tag: string) => void;
    onDeleteTag: (roleId: number, tagToDelete: string) => void;
};

const CreateProjectTeamSection = ({
    teamRoles,
    availableRoles,
    roleErrors = {},
    disabled = false,
    onAddRole,
    onRemoveRole,
    onRoleChange,
    onAddTag,
    onDeleteTag,
}: CreateProjectTeamSectionProps) => {
    return (
        <Stack spacing={2.5}>
            <Typography
                sx={{
                    fontSize: { xs: 24, md: 28 },
                    fontWeight: 600,
                    lineHeight: 1.15,
                }}
            >
                Команда
            </Typography>

            <Stack spacing={2.5}>
                {teamRoles.map((teamRole, index) => (
                    <CreateProjectTeamRoleCard
                        key={teamRole.id}
                        index={index}
                        teamRole={teamRole}
                        availableRoles={availableRoles}
                        errors={roleErrors[teamRole.id]}
                        isRemoveDisabled={teamRoles.length === 1}
                        disabled={disabled}
                        onRemove={onRemoveRole}
                        onRoleChange={onRoleChange}
                        onAddTag={onAddTag}
                        onDeleteTag={onDeleteTag}
                    />
                ))}
            </Stack>

            <Button
                variant="contained"
                startIcon={<AddRounded />}
                onClick={onAddRole}
                disabled={disabled}
                sx={{
                    alignSelf: "flex-start",
                    borderRadius: 2,
                    boxShadow: "none",
                }}
            >
                Добавить участника
            </Button>
        </Stack>
    );
};

export default CreateProjectTeamSection;
