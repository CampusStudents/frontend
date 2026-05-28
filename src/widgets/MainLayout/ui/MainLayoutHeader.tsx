import { CloseRounded, MenuRounded } from "@mui/icons-material";
import {
    Box,
    Drawer,
    IconButton,
    Paper,
    Stack,
    Typography,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import { useState } from "react";

import MainLayoutHeaderBrand, {
    MainLayoutHeaderBrandActions,
} from "./MainLayoutHeaderBrand";
import MainLayoutHeaderNav, {
    MainLayoutHeaderNavDivider,
} from "./MainLayoutHeaderNav";
import { getHeaderNavigationItems } from "./headerNavigation";

import { tokenStorage } from "@shared/lib/auth";
import { AuthRequiredDialog } from "@shared/ui/AuthRequiredDialog";

const MainLayoutHeader = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const isAuthenticated = Boolean(tokenStorage.get());
    const [isLoginPromptOpen, setIsLoginPromptOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigationItems = getHeaderNavigationItems(isAuthenticated);

    const closeMenu = () => setIsMenuOpen(false);

    return (
        <Paper
            elevation={0}
            sx={{
                mb: { xs: 3, md: 5 },
                px: { xs: 1.5, sm: 2.5, md: 3.5 },
                py: { xs: 1.5, sm: 2.25, md: 2.5 },
                borderRadius: 1.5,
            }}
        >
            {isMobile ? (
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    spacing={1.5}
                >
                    <MainLayoutHeaderBrand
                        compact
                        isAuthenticated={isAuthenticated}
                        onCreateProjectClick={() => setIsLoginPromptOpen(true)}
                    />
                    <IconButton
                        aria-label="Открыть меню"
                        onClick={() => setIsMenuOpen(true)}
                        sx={{
                            width: 44,
                            height: 44,
                            borderRadius: 1.5,
                            border: "1px solid",
                            borderColor: "divider",
                            flexShrink: 0,
                        }}
                    >
                        <MenuRounded />
                    </IconButton>

                    <Drawer
                        anchor="right"
                        open={isMenuOpen}
                        onClose={closeMenu}
                        slotProps={{
                            paper: {
                                sx: {
                                    width: "min(320px, 100vw)",
                                    px: 2,
                                    py: 2.5,
                                },
                            },
                        }}
                    >
                        <Stack spacing={2.5} sx={{ height: "100%" }}>
                            <Stack
                                direction="row"
                                alignItems="center"
                                justifyContent="space-between"
                            >
                                <Typography
                                    sx={{ fontWeight: 600, fontSize: 18 }}
                                >
                                    Меню
                                </Typography>
                                <IconButton
                                    aria-label="Закрыть меню"
                                    onClick={closeMenu}
                                    sx={{
                                        width: 40,
                                        height: 40,
                                    }}
                                >
                                    <CloseRounded />
                                </IconButton>
                            </Stack>

                            <MainLayoutHeaderBrandActions
                                isAuthenticated={isAuthenticated}
                                onCreateProjectClick={() =>
                                    setIsLoginPromptOpen(true)
                                }
                                onNavigate={closeMenu}
                            />

                            <MainLayoutHeaderNavDivider />

                            <Box sx={{ flex: 1, overflowY: "auto" }}>
                                <MainLayoutHeaderNav
                                    items={navigationItems}
                                    orientation="vertical"
                                    onNavigate={closeMenu}
                                />
                            </Box>
                        </Stack>
                    </Drawer>
                </Stack>
            ) : (
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 3,
                    }}
                >
                    <MainLayoutHeaderBrand
                        isAuthenticated={isAuthenticated}
                        onCreateProjectClick={() => setIsLoginPromptOpen(true)}
                    />
                    <MainLayoutHeaderNav items={navigationItems} />
                </Box>
            )}

            <AuthRequiredDialog
                open={isLoginPromptOpen}
                onClose={() => setIsLoginPromptOpen(false)}
                title="Нужно войти в аккаунт"
                description="Чтобы создать проект, нужно войти в аккаунт."
            />
        </Paper>
    );
};

export default MainLayoutHeader;
