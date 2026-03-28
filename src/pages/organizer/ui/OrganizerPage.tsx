import { Box, Stack } from "@mui/material";

import { OrganizerEventsSection } from "./OrganizerEventsSection";
import { OrganizerProfileCard } from "./OrganizerProfileCard";

import { AppHeader } from "@widgets/AppHeader";

const OrganizerPage = () => {
    return (
        <Box
            sx={{
                minHeight: "100vh",
                bgcolor: "#F5F7FB",
                px: { xs: 2, md: 4 },
                py: { xs: 2, md: 3 },
            }}
        >
            <Box sx={{ maxWidth: 1180, mx: "auto" }}>
                <AppHeader />

                <Stack spacing={4}>
                    <OrganizerProfileCard />
                    <OrganizerEventsSection />
                </Stack>
            </Box>
        </Box>
    );
};

export default OrganizerPage;
