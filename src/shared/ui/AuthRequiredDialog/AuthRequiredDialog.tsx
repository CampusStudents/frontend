import { CloseRounded } from "@mui/icons-material";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

import { routePaths } from "@shared/config";

type AuthRequiredDialogProps = {
    open: boolean;
    onClose: () => void;
    title: string;
    description: string;
};

const AuthRequiredDialog = ({
    open,
    onClose,
    title,
    description,
}: AuthRequiredDialogProps) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="xs"
            slotProps={{
                backdrop: {
                    sx: {
                        bgcolor: "rgba(15, 18, 23, 0.56)",
                        backdropFilter: "blur(2px)",
                    },
                },
                paper: {
                    elevation: 0,
                    sx: {
                        width: "min(420px, calc(100vw - 32px))",
                        borderRadius: 2,
                        m: 2,
                    },
                },
            }}
        >
            <DialogTitle sx={{ pr: 6, pb: 1.5 }}>
                {title}
                <IconButton
                    aria-label="Закрыть"
                    onClick={onClose}
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
                    {description}
                </Typography>
            </DialogContent>
            <DialogActions sx={{ px: 3, pb: 3 }}>
                <Button onClick={onClose} color="inherit">
                    Позже
                </Button>
                <Button
                    component={RouterLink}
                    to={routePaths.login}
                    variant="contained"
                    onClick={onClose}
                    sx={{ boxShadow: "none" }}
                >
                    Войти
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AuthRequiredDialog;
