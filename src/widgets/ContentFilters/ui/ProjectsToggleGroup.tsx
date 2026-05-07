import { useEffect, useState } from "react";
import { Stack, ToggleButton, ToggleButtonGroup } from "@mui/material";

type ContentFiltersProps = {
    selectedView?: string;
    participantCount?: number;
    creatorCount?: number;
    draftsCount?: number;
    onViewChange?: (value: string) => void;
};

const ProjectsToggleGroup = ({
    selectedView = "participants",
    participantCount = 124,
    creatorCount = 38,
    draftsCount = 45,
    onViewChange,
}: ContentFiltersProps) => {
    const [currentView, setCurrentView] = useState(selectedView);

    useEffect(() => {
        setCurrentView(selectedView);
    }, [selectedView]);

    const handleViewChange = (
        _event: React.MouseEvent<HTMLElement>,
        value: string | null,
    ) => {
        if (!value) {
            return;
        }

        setCurrentView(value);
        onViewChange?.(value);
    };

    return (
        <Stack spacing={3}>
            <Stack
                direction={{ xs: "column", md: "row" }}
                spacing={2}
                alignItems={{ xs: "stretch", md: "center" }}
            />

            <ToggleButtonGroup
                value={currentView}
                exclusive
                onChange={handleViewChange}
                sx={{
                    width: "fit-content",
                    alignSelf: "flex-start",
                    "& .MuiToggleButton-root": {
                        px: 2.5,
                        borderRadius: 2,
                    },
                }}
            >
                <ToggleButton value="participants">
                    {`Участник (${participantCount})`}
                </ToggleButton>
                <ToggleButton value="creators">
                    {`Создатель (${creatorCount})`}
                </ToggleButton>
                <ToggleButton value="drafts">
                    {`Черновики (${draftsCount})`}
                </ToggleButton>
            </ToggleButtonGroup>
        </Stack>
    );
};

export default ProjectsToggleGroup;
