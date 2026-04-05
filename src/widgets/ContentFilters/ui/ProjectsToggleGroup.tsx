import { Stack, ToggleButton, ToggleButtonGroup } from "@mui/material";

type ContentFiltersProps = {
    selectedView?: string;
    participantCount?: number;
    creatorCount?: number;
    draftsCount?: number;
};

const ProjectsToggleGroup = ({
    selectedView = "projects",
    participantCount = 124,
    creatorCount = 38,
    draftsCount = 45,
}: ContentFiltersProps) => {
    return (
        <Stack spacing={3}>
            <Stack
                direction={{ xs: "column", md: "row" }}
                spacing={2}
                alignItems={{ xs: "stretch", md: "center" }}
            />

            <ToggleButtonGroup
                value={selectedView}
                exclusive
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
