import { Box, Paper, Typography } from "@mui/material";

const ProjectDateBadge = () => {
    return (
        <Paper
            variant="outlined"
            sx={{
                width: 50,
                height: 50,
                overflow: "hidden",
                borderRadius: 1,
                borderColor: "divider",
                display: "flex",
                flexDirection: "column",
                flexShrink: 0,
            }}
        >
            <Box
                sx={{
                    height: 16,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    bgcolor: "rgba(60, 102, 224, 0.12)",
                }}
            >
                <Typography
                    sx={{
                        fontSize: 10,
                        color: "primary.main",
                        textTransform: "uppercase",
                        fontWeight: 600,
                        lineHeight: 1,
                    }}
                >
                    ноя
                </Typography>
            </Box>
            <Box
                sx={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    bgcolor: "background.paper",
                }}
            >
                <Typography
                    sx={{
                        fontSize: 20,
                        fontWeight: 500,
                        color: "primary.main",
                        lineHeight: 1,
                    }}
                >
                    11
                </Typography>
            </Box>
        </Paper>
    );
};

export default ProjectDateBadge;
