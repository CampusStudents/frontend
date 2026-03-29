import { Paper, Stack, Typography } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";

type EmptyStateProps = {
    title: string;
    description: string;
    sx?: SxProps<Theme>;
};

const EmptyState = ({ title, description, sx }: EmptyStateProps) => {
    return (
        <Paper
            elevation={0}
            sx={[
                {
                    borderRadius: 1.5,
                    px: { xs: 2.5, md: 3 },
                    py: { xs: 4, md: 5 },
                    border: "1px dashed #D7DEE8",
                    bgcolor: "#FCFDFE",
                },
                ...(Array.isArray(sx) ? sx : [sx]),
            ]}
        >
            <Stack spacing={0.75} alignItems="flex-start">
                <Typography sx={{ fontSize: 24, fontWeight: 600 }}>
                    {title}
                </Typography>
                <Typography
                    sx={{
                        maxWidth: 620,
                        color: "text.secondary",
                        lineHeight: 1.5,
                    }}
                >
                    {description}
                </Typography>
            </Stack>
        </Paper>
    );
};

export default EmptyState;
