import {
    ButtonBase,
    Divider,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Stack,
    Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

import type { HeaderNavigationItem } from "./headerNavigation";

type MainLayoutHeaderNavProps = {
    items: HeaderNavigationItem[];
    orientation?: "horizontal" | "vertical";
    onNavigate?: () => void;
};

const MainLayoutHeaderNav = ({
    items,
    orientation = "horizontal",
    onNavigate,
}: MainLayoutHeaderNavProps) => {
    if (orientation === "vertical") {
        return (
            <List
                disablePadding
                sx={{
                    width: "100%",
                }}
            >
                {items.map((item, index) => (
                    <ListItemButton
                        key={item.label}
                        component={RouterLink}
                        to={item.to}
                        onClick={onNavigate}
                        sx={{
                            px: 1.5,
                            py: 1.25,
                            borderRadius: 1.5,
                            mb: index < items.length - 1 ? 0.5 : 0,
                        }}
                    >
                        {item.icon ? (
                            <ListItemIcon
                                sx={{
                                    minWidth: 40,
                                    color: "text.secondary",
                                }}
                            >
                                {item.icon}
                            </ListItemIcon>
                        ) : null}
                        <ListItemText
                            primary={item.label}
                            slotProps={{
                                primary: {
                                    sx: {
                                        fontWeight: 500,
                                    },
                                },
                            }}
                        />
                    </ListItemButton>
                ))}
            </List>
        );
    }

    return (
        <Stack
            direction="row"
            spacing={{ sm: 1.5, md: 3 }}
            useFlexGap
            flexWrap="wrap"
            justifyContent="flex-end"
            sx={{ width: "auto" }}
        >
            {items.map((item) => (
                <ButtonBase
                    key={item.label}
                    component={RouterLink}
                    to={item.to}
                    sx={{
                        px: 1.5,
                        py: 1,
                        borderRadius: 1.5,
                        color: "text.secondary",
                        minWidth: 92,
                        transition:
                            "background-color 150ms ease, color 150ms ease, transform 150ms ease",
                        "@media (hover: hover)": {
                            "&:hover": {
                                bgcolor: "rgba(47, 89, 213, 0.08)",
                                color: "primary.main",
                            },
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

export const MainLayoutHeaderNavDivider = () => <Divider sx={{ my: 1.5 }} />;
