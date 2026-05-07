import { AddRounded } from "@mui/icons-material";
import { Button, Stack, Typography } from "@mui/material";

import type { TeamRole } from "../model/types";

import CreateProjectTeamRoleCard from "./CreateProjectTeamRoleCard";

type CreateProjectTeamSectionProps = {
    teamRoles: TeamRole[];
    onAddRole: () => void;
    onRemoveRole: (roleId: number) => void;
    onRoleChange: (
        roleId: number,
        field: "role" | "description",
        value: string,
    ) => void;
    onDeleteTag: (roleId: number, tagToDelete: string) => void;
};

const CreateProjectTeamSection = ({
    teamRoles,
    onAddRole,
    onRemoveRole,
    onRoleChange,
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
                        isRemoveDisabled={teamRoles.length === 1}
                        onRemove={onRemoveRole}
                        onRoleChange={onRoleChange}
                        onDeleteTag={onDeleteTag}
                    />
                ))}
            </Stack>

            <Button
                variant="contained"
                startIcon={<AddRounded />}
                onClick={onAddRole}
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
