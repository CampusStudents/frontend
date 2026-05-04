import {
    CalendarMonthRounded,
    CloseRounded,
    FavoriteBorderRounded,
    NotificationsNoneRounded,
    PersonOutlineRounded,
    WorkOutlineRounded,
} from "@mui/icons-material";
import {
    Box,
    Button,
    ButtonBase,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Paper,
    Stack,
    Typography,
} from "@mui/material";
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";

import { routePaths } from "@shared/config";
import { tokenStorage } from "@shared/lib/auth";

const MainLayoutHeader = () => {
    const isAuthenticated = Boolean(tokenStorage.get());
    const [isLoginPromptOpen, setIsLoginPromptOpen] = useState(false);
    const navigationItems = [
        ...(isAuthenticated
            ? [
                  {
                      icon: <NotificationsNoneRounded fontSize="small" />,
                      label: "Уведомления",
                      to: routePaths.notifications,
                  },
                  {
                      icon: <FavoriteBorderRounded fontSize="small" />,
                      label: "Избранное",
                      to: routePaths.favorites,
                  },
              ]
            : [
                  {
                      icon: <WorkOutlineRounded fontSize="small" />,
                      label: "Проекты",
                      to: routePaths.home,
                  },
                  {
                      icon: <CalendarMonthRounded fontSize="small" />,
                      label: "Мероприятия",
                      to: routePaths.home,
                  },
              ]),
        {
            icon: <PersonOutlineRounded fontSize="small" />,
            label: isAuthenticated ? "Профиль" : "Войти",
            to: isAuthenticated ? routePaths.profile : routePaths.login,
        },
    ];

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
            <Stack
                direction={{ xs: "column", md: "row" }}
                spacing={{ xs: 2, md: 3.5 }}
                alignItems={{ xs: "flex-start", md: "center" }}
                sx={{ width: { xs: "100%", md: "auto" } }}
            >
                <Box
                    component={RouterLink}
                    to={routePaths.home}
                    aria-label="Перейти на главную"
                    sx={{
                        display: "inline-flex",
                        flexShrink: 0,
                        borderRadius: 1,
                        lineHeight: 0,
                        textDecoration: "none",
                        transition: "transform 150ms ease, opacity 150ms ease",
                        "&:hover": {
                            opacity: 0.88,
                        },
                        "&:focus-visible": {
                            outline: "2px solid",
                            outlineColor: "primary.main",
                            outlineOffset: 3,
                        },
                    }}
                >
                    <Box
                        component="img"
                        src="/logo.svg"
                        alt="Campus logo"
                        sx={{
                            width: { xs: 88, sm: 96, md: 110 },
                            height: { xs: 32, sm: 35, md: 40 },
                            display: "block",
                            objectFit: "contain",
                        }}
                    />
                </Box>
                <Stack
                    direction={{ xs: "column", sm: "row" }}
                    spacing={1.25}
                    flexWrap="wrap"
                    useFlexGap
                    sx={{ width: { xs: "100%", md: "auto" } }}
                >
                    {isAuthenticated ? (
                        <Button
                            component={RouterLink}
                            to={routePaths.projects}
                            variant="outlined"
                            sx={{
                                minWidth: 0,
                                px: 2.25,
                                borderRadius: 1.5,
                                width: { xs: "100%", sm: "auto" },
                            }}
                        >
                            Мои проекты
                        </Button>
                    ) : null}
                    {isAuthenticated ? (
                        <Button
                            component={RouterLink}
                            to={routePaths.createProject}
                            variant="outlined"
                            sx={{
                                minWidth: 0,
                                px: 2.25,
                                borderRadius: 1.5,
                                width: { xs: "100%", sm: "auto" },
                            }}
                        >
                            + Создать проект
                        </Button>
                    ) : (
                        <Button
                            onClick={() => setIsLoginPromptOpen(true)}
                            variant="outlined"
                            sx={{
                                minWidth: 0,
                                px: 2.25,
                                borderRadius: 1.5,
                                width: { xs: "100%", sm: "auto" },
                            }}
                        >
                            + Создать проект
                        </Button>
                    )}
                </Stack>
            </Stack>

            <Stack
                direction="row"
                spacing={{ xs: 1, sm: 1.5, md: 3 }}
                useFlexGap
                flexWrap="wrap"
                justifyContent={{ xs: "flex-start", md: "flex-end" }}
                sx={{ width: { xs: "100%", md: "auto" } }}
            >
                {navigationItems.map((item) => (
                    <ButtonBase
                        key={item.label}
                        component={item.to ? RouterLink : "button"}
                        to={item.to}
                        type={item.to ? undefined : "button"}
                        sx={{
                            px: { xs: 1.25, sm: 1.5 },
                            py: 1,
                            borderRadius: 1.5,
                            color: "text.secondary",
                            minWidth: { xs: 84, sm: 92 },
                            transition:
                                "background-color 150ms ease, color 150ms ease, transform 150ms ease",
                            "&:hover": {
                                bgcolor: "rgba(47, 89, 213, 0.08)",
                                color: "primary.main",
                            },
                            "&:focus-visible": {
                                outline: "2px solid",
                                outlineColor: "primary.main",
                                outlineOffset: 2,
                            },
                            "&:active": {
                                transform: "translateY(1px)",
                            },
                        }}
                    >
                        <Stack
                            spacing={0.5}
                            alignItems="center"
                            sx={{ color: "inherit" }}
                        >
                            {item.icon}
                            <Typography
                                variant="caption"
                                sx={{ color: "inherit" }}
                            >
                                {item.label}
                            </Typography>
                        </Stack>
                    </ButtonBase>
                ))}
            </Stack>

            <Dialog
                open={isLoginPromptOpen}
                onClose={() => setIsLoginPromptOpen(false)}
                fullWidth
                maxWidth="xs"
                PaperProps={{
                    sx: {
                        borderRadius: 2,
                    },
                }}
            >
                <DialogTitle sx={{ pr: 6, pb: 1.5 }}>
                    Нужно войти в аккаунт
                    <IconButton
                        aria-label="Закрыть"
                        onClick={() => setIsLoginPromptOpen(false)}
                        sx={{
                            position: "absolute",
                            right: 12,
                            top: 12,
                            color: "text.secondary",
                        }}
                    >
                        <CloseRounded fontSize="small" />
                    </IconButton>
                </DialogTitle>
                <DialogContent sx={{ pb: 1 }}>
                    <Typography color="text.secondary" sx={{ lineHeight: 1.6 }}>
                        Чтобы создать проект, нужно войти в аккаунт.
                    </Typography>
                </DialogContent>
                <DialogActions sx={{ px: 3, pb: 3 }}>
                    <Button
                        onClick={() => setIsLoginPromptOpen(false)}
                        color="inherit"
                    >
                        Позже
                    </Button>
                    <Button
                        component={RouterLink}
                        to={routePaths.login}
                        variant="contained"
                        onClick={() => setIsLoginPromptOpen(false)}
                        sx={{ boxShadow: "none" }}
                    >
                        Войти
                    </Button>
                </DialogActions>
            </Dialog>
        </Paper>
    );
};

export default MainLayoutHeader;
