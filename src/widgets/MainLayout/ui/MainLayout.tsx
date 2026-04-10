import { Box, Link, Stack, Typography } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";
import type { ReactNode } from "react";
import { Link as RouterLink, Outlet } from "react-router-dom";

import MainLayoutHeader from "./MainLayoutHeader";
import ScrollToTop from "./ScrollToTop";

import { routePaths } from "@shared/config";

type MainLayoutProps = {
    children?: ReactNode;
    maxWidth?: number | string;
    sx?: SxProps<Theme>;
};

const footerLinks = [
    { label: "Проекты", path: routePaths.projects },
    { label: "Избранное", path: routePaths.favorites },
    { label: "Профиль", path: routePaths.profile },
];

const MainLayoutFooter = () => {
    return (
        <Box
            component="footer"
            sx={{
                mt: { xs: 5, md: 7 },
                pt: { xs: 2.5, md: 3 },
                borderTop: "1px solid",
                borderColor: "divider",
            }}
        >
            <Stack
                direction={{ xs: "column", md: "row" }}
                spacing={{ xs: 2, md: 3 }}
                alignItems={{ xs: "flex-start", md: "center" }}
                justifyContent="space-between"
            >
                <Stack spacing={0.5}>
                    <Link
                        component={RouterLink}
                        to={routePaths.home}
                        underline="none"
                        color="text.primary"
                        sx={{
                            fontSize: 18,
                            fontWeight: 700,
                            lineHeight: 1.1,
                            width: "fit-content",
                        }}
                    >
                        Campus
                    </Link>
                    <Typography
                        variant="body2"
                        sx={{
                            color: "text.secondary",
                            maxWidth: 420,
                            lineHeight: 1.5,
                        }}
                    >
                        Команды, проекты и мероприятия для студенческих
                        инициатив.
                    </Typography>
                </Stack>

                <Stack
                    direction={{ xs: "column", sm: "row" }}
                    spacing={{ xs: 1, sm: 2.5 }}
                    alignItems={{ xs: "flex-start", sm: "center" }}
                    useFlexGap
                >
                    {footerLinks.map((item) => (
                        <Link
                            key={item.path}
                            component={RouterLink}
                            to={item.path}
                            underline="hover"
                            color="text.secondary"
                            sx={{
                                fontSize: 14,
                                fontWeight: 500,
                            }}
                        >
                            {item.label}
                        </Link>
                    ))}
                </Stack>
            </Stack>
        </Box>
    );
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
            <Box
                sx={{
                    maxWidth,
                    mx: "auto",
                    minHeight: "100%",
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <ScrollToTop />
                <MainLayoutHeader />
                <Box sx={{ flex: 1 }}>{children ?? <Outlet />}</Box>
                <MainLayoutFooter />
            </Box>
        </Box>
    );
};

export default MainLayout;
