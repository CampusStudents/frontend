import { Box, Button, Stack } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

import { routePaths } from "@shared/config";

type MainLayoutHeaderBrandProps = {
    isAuthenticated: boolean;
    onCreateProjectClick: () => void;
};

const MainLayoutHeaderBrand = ({
    isAuthenticated,
    onCreateProjectClick,
}: MainLayoutHeaderBrandProps) => {
    return (
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
                        onClick={onCreateProjectClick}
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
    );
};

export default MainLayoutHeaderBrand;
