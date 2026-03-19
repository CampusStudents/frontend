import { createTheme } from "@mui/material";

import { palette } from "./palette";
import { shape } from "./shape";

export const theme = createTheme({
    palette,
    shape,

    components: {
        MuiOutlinedInput: {
            styleOverrides: {
                root: ({ theme }) => ({
                    borderRadius: theme.shape.borderRadius,
                }),
            },
        },
        MuiToggleButtonGroup: {
            styleOverrides: {
                root: ({ theme }) => ({
                    background: theme.palette.grey[100],
                    border: `1px solid ${theme.palette.grey[200]}`,
                    borderRadius: theme.shape.borderRadiusPill,
                    padding: 4,
                    gap: 0,
                    "& .MuiToggleButtonGroup-grouped": {
                        border: "none",
                        borderRadius: theme.shape.borderRadiusPill,
                        margin: 0,
                    },
                }),
            },
        },
        MuiToggleButton: {
            styleOverrides: {
                root: ({ theme }) => ({
                    fontWeight: theme.typography.fontWeightMedium,
                    color: theme.palette.text.primary,
                    textTransform: "none" as const,
                    padding: "6px 24px",
                    borderRadius: theme.shape.borderRadiusPillSmall,
                    "&.Mui-selected": {
                        background: theme.palette.background.paper,
                        color: theme.palette.text.primary,
                        "&:hover": {
                            background: theme.palette.background.paper,
                        },
                    },
                    "&:hover": {
                        background: "transparent",
                    },
                }),
            },
        },
    },
});
