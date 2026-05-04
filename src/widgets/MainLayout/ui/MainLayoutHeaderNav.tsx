import { ButtonBase, Stack, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

import type { HeaderNavigationItem } from "./headerNavigation";

type MainLayoutHeaderNavProps = {
    items: HeaderNavigationItem[];
};

const MainLayoutHeaderNav = ({ items }: MainLayoutHeaderNavProps) => {
    return (
        <Stack
            direction="row"
            spacing={{ xs: 1, sm: 1.5, md: 3 }}
            useFlexGap
            flexWrap="wrap"
            justifyContent={{ xs: "flex-start", md: "flex-end" }}
            sx={{ width: { xs: "100%", md: "auto" } }}
        >
            {items.map((item) => (
                <ButtonBase
                    key={item.label}
                    component={RouterLink}
                    to={item.to}
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
                        <Typography variant="caption" sx={{ color: "inherit" }}>
                            {item.label}
                        </Typography>
                    </Stack>
                </ButtonBase>
            ))}
        </Stack>
    );
};

export default MainLayoutHeaderNav;
