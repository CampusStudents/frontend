import { Paper } from "@mui/material";
import { useState } from "react";

import MainLayoutCreateProjectPrompt from "./MainLayoutCreateProjectPrompt";
import MainLayoutHeaderBrand from "./MainLayoutHeaderBrand";
import MainLayoutHeaderNav from "./MainLayoutHeaderNav";
import { getHeaderNavigationItems } from "./headerNavigation";

import { tokenStorage } from "@shared/lib/auth";

const MainLayoutHeader = () => {
    const isAuthenticated = Boolean(tokenStorage.get());
    const [isLoginPromptOpen, setIsLoginPromptOpen] = useState(false);
    const navigationItems = getHeaderNavigationItems(isAuthenticated);

    return (
        <Paper
            elevation={0}
            sx={{
                mb: 5,
                display: "flex",
                alignItems: { xs: "flex-start", md: "center" },
                justifyContent: "space-between",
                gap: { xs: 2.5, md: 3 },
                px: { xs: 2, sm: 2.5, md: 3.5 },
                py: { xs: 2, sm: 2.25, md: 2.5 },
                borderRadius: 1.5,
                flexDirection: { xs: "column", md: "row" },
            }}
        >
            <MainLayoutHeaderBrand
                isAuthenticated={isAuthenticated}
                onCreateProjectClick={() => setIsLoginPromptOpen(true)}
            />
            <MainLayoutHeaderNav items={navigationItems} />
            <MainLayoutCreateProjectPrompt
                open={isLoginPromptOpen}
                onClose={() => setIsLoginPromptOpen(false)}
            />
        </Paper>
    );
};

export default MainLayoutHeader;
