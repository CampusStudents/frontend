import { LocationOnOutlined } from "@mui/icons-material";
import { Paper } from "@mui/material";

const DetailsLocationBadge = () => {
    return (
        <Paper
            variant="outlined"
            sx={{
                width: 50,
                height: 50,
                borderRadius: 1,
                borderColor: "divider",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "text.secondary",
                flexShrink: 0,
            }}
        >
            <LocationOnOutlined sx={{ fontSize: 24 }} />
        </Paper>
    );
};

export default DetailsLocationBadge;
