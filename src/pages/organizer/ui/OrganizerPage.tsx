import { Stack } from "@mui/material";

import { OrganizerEventsSection } from "./OrganizerEventsSection";
import { OrganizerProfileCard } from "./OrganizerProfileCard";

const OrganizerPage = () => {
    return (
        <Stack spacing={4}>
            <OrganizerProfileCard />
            <OrganizerEventsSection />
        </Stack>
    );
};

export default OrganizerPage;
