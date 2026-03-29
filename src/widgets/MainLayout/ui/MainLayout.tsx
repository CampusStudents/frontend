import { Box } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";
import type { ReactNode } from "react";
import { Outlet } from "react-router-dom";

import MainLayoutHeader from "./MainLayoutHeader";

type MainLayoutProps = {
    children?: ReactNode;
    maxWidth?: number | string;
    sx?: SxProps<Theme>;
};

const MainLayout = ({ children, maxWidth = 1280, sx }: MainLayoutProps) => {
    return (
        <Box
            sx={[
                {
                    minHeight: "100vh",
                    bgcolor: "background.default",
                    px: { xs: 2, md: 4 },
                    py: { xs: 2, md: 3 },
                },
                ...(Array.isArray(sx) ? sx : [sx]),
            ]}
        >
            <Box sx={{ maxWidth, mx: "auto" }}>
                <MainLayoutHeader />
                {children ?? <Outlet />}
            </Box>
        </Box>
    );
};

export default MainLayout;
