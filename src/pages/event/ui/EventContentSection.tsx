import { Button, Stack, Typography } from "@mui/material";

import type { EventDetails } from "../model/types";

import { DetailsSectionDivider } from "@widgets/DetailSections";

type EventContentSectionProps = {
    details: EventDetails;
    onCreateProject: () => void;
};

const EventContentSection = ({
    details,
    onCreateProject,
}: EventContentSectionProps) => {
    return (
        <Stack spacing={1.5} sx={{ minWidth: 0, flex: 1 }}>
            <Typography
                variant="body2"
                sx={{
                    color: "text.secondary",
                    fontWeight: 500,
                }}
            >
                {details.aboutLabel}
            </Typography>
            <DetailsSectionDivider />
            {details.description.map((paragraph, index) => (
                <Typography
                    key={index}
                    sx={{
                        fontSize: 16,
                        lineHeight: 1.7,
                        color: "text.primary",
                    }}
                >
                    {paragraph}
                </Typography>
            ))}
            <Button
                variant="contained"
                onClick={onCreateProject}
                sx={{
                    alignSelf: "flex-start",
                    minHeight: 46,
                    borderRadius: 1.5,
                    boxShadow: "none",
                    textTransform: "none",
                    fontWeight: 500,
                }}
            >
                {details.primaryActionLabel}
            </Button>
        </Stack>
    );
};

export default EventContentSection;
