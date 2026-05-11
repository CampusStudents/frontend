import { Box, CircularProgress, Typography } from "@mui/material";

const Loader = () => {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 2,
                minHeight: "100vh",
                bgcolor: "background.default",
            }}
        >
            <Box sx={{ position: "relative", display: "inline-flex" }}>
                <CircularProgress
                    size={48}
                    thickness={3}
                    sx={{ color: "primary.main" }}
                />
            </Box>
            <Typography
                variant="overline"
                color="primary"
                sx={{
                    fontWeight: 800,
                    letterSpacing: 0,
                    textTransform: "none",
                    fontSize: "1rem",
                    lineHeight: 1,
                    opacity: 0.7,
                }}
            >
                campus
            </Typography>
        </Box>
    );
};

export default Loader;
