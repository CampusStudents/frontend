import { Button, Paper, Stack } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { createDefaultTeamRole, createEmptyTeamRole } from "../model/defaults";
import type { TeamRole } from "../model/types";

import CreateProjectBasicsSection from "./CreateProjectBasicsSection";
import CreateProjectTeamSection from "./CreateProjectTeamSection";

const CreateProjectPage = () => {
    const navigate = useNavigate();

    const [teamRoles, setTeamRoles] = useState<TeamRole[]>([
        createDefaultTeamRole(),
    ]);

    const handleAddRole = () => {
        setTeamRoles((currentRoles) => [
            ...currentRoles,
            createEmptyTeamRole(),
        ]);
    };

    const handleRoleChange = (
        roleId: number,
        field: "role" | "description",
        value: string,
    ) => {
        setTeamRoles((currentRoles) =>
            currentRoles.map((item) =>
                item.id === roleId ? { ...item, [field]: value } : item,
            ),
        );
    };

    const handleDeleteTag = (roleId: number, tagToDelete: string) => {
        setTeamRoles((currentRoles) =>
            currentRoles.map((item) =>
                item.id === roleId
                    ? {
                          ...item,
                          tags: item.tags.filter((tag) => tag !== tagToDelete),
                      }
                    : item,
            ),
        );
    };

    const handleRemoveRole = (roleId: number) => {
        setTeamRoles((currentRoles) =>
            currentRoles.length === 1
                ? currentRoles
                : currentRoles.filter((item) => item.id !== roleId),
        );
    };

    return (
        <Stack spacing={3}>
            <Paper
                elevation={0}
                sx={{
                    borderRadius: 2.5,
                    p: { xs: 2, md: 3.5 },
                    bgcolor: "background.paper",
                }}
            >
                <Stack spacing={4}>
                    <CreateProjectBasicsSection />
                    <CreateProjectTeamSection
                        teamRoles={teamRoles}
                        onAddRole={handleAddRole}
                        onRemoveRole={handleRemoveRole}
                        onRoleChange={handleRoleChange}
                        onDeleteTag={handleDeleteTag}
                    />

                    <Stack
                        direction={{ xs: "column", sm: "row" }}
                        spacing={1.5}
                    >
                        <Button
                            variant="outlined"
                            onClick={() => navigate(-1)}
                            sx={{
                                minWidth: 140,
                                borderRadius: 2,
                            }}
                        >
                            Отмена
                        </Button>
                        <Button
                            variant="outlined"
                            color="inherit"
                            sx={{
                                minWidth: 180,
                                borderRadius: 2,
                                color: "text.secondary",
                                borderColor: "divider",
                            }}
                        >
                            Сохранить черновик
                        </Button>
                        <Button
                            variant="contained"
                            sx={{
                                minWidth: 140,
                                borderRadius: 2,
                                boxShadow: "none",
                            }}
                        >
                            Применить
                        </Button>
                    </Stack>
                </Stack>
            </Paper>
        </Stack>
    );
};

export default CreateProjectPage;
