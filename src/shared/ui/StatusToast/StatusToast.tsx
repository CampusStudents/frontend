import { CheckRounded } from "@mui/icons-material";
import {
    Paper,
    Snackbar,
    SnackbarContent,
    Stack,
    Typography,
} from "@mui/material";

type StatusToastProps = {
    open: boolean;
    title: string;
    message: string;
    onClose?: () => void;
    anchorOrigin?: {
        vertical: "top" | "bottom";
        horizontal: "left" | "center" | "right";
    };
};

const StatusToast = ({
    open,
    title,
    message,
    onClose,
    anchorOrigin = { vertical: "top", horizontal: "right" },
}: StatusToastProps) => {
    return (
        <Snackbar
            open={open}
            onClose={onClose}
            anchorOrigin={anchorOrigin}
            sx={{
                top: { xs: 16, sm: 24 },
                right:
                    anchorOrigin.horizontal === "right"
                        ? { xs: 16, sm: 24 }
                        : undefined,
                left:
                    anchorOrigin.horizontal === "left"
                        ? { xs: 16, sm: 24 }
                        : undefined,
            }}
            slotProps={{
                transition: {
                    timeout: 250,
                },
            }}
        >
            <SnackbarContent
                sx={{
                    minWidth: { xs: 280, sm: 380 },
                    maxWidth: 420,
                    px: 2,
                    py: 1.75,
                    borderRadius: 2.5,
                    boxShadow: "0 16px 48px rgba(18, 24, 38, 0.12)",
                    bgcolor: "background.paper",
                    color: "text.primary",
                    "& .MuiSnackbarContent-message": {
                        p: 0,
                        width: "100%",
                    },
                }}
                message={
                    <Stack direction="row" spacing={1.75} alignItems="center">
                        <Paper
                            elevation={0}
                            sx={{
                                width: 28,
                                height: 28,
                                borderRadius: 1,
                                bgcolor: "#151515",
                                color: "#FFFFFF",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: 9,
                                fontWeight: 700,
                                flexShrink: 0,
                            }}
                        >
                            {title
                                .split(" ")
                                .map((word) => word[0])
                                .join("")
                                .slice(0, 3)}
                        </Paper>

                        <Stack spacing={0.5} sx={{ minWidth: 0 }}>
                            <Typography
                                sx={{
                                    color: "text.secondary",
                                    fontSize: 15,
                                }}
                            >
                                {title}
                            </Typography>
                            <Stack
                                direction="row"
                                spacing={1.25}
                                alignItems="center"
                            >
                                <CheckRounded
                                    sx={{
                                        fontSize: 34,
                                        color: "#111111",
                                    }}
                                />
                                <Typography
                                    sx={{
                                        fontSize: 16,
                                        fontWeight: 500,
                                    }}
                                >
                                    {message}
                                </Typography>
                            </Stack>
                        </Stack>
                    </Stack>
                }
            />
        </Snackbar>
    );
};

export default StatusToast;
