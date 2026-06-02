import { useEffect, useState } from "react";
import { Stack, ToggleButton, ToggleButtonGroup } from "@mui/material";

type ContentFiltersProps = {
    selectedView?: string;
    participantCount?: number;
    creatorCount?: number;
    onViewChange?: (value: string) => void;
};

const ProjectsToggleGroup = ({
    selectedView = "participants",
    participantCount = 0,
    creatorCount = 0,
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
            </ToggleButtonGroup>
        </Stack>
    );
};

export default ProjectsToggleGroup;
