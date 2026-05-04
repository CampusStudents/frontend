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

type MainLayoutCreateProjectPromptProps = {
    open: boolean;
    onClose: () => void;
};

const MainLayoutCreateProjectPrompt = ({
    open,
    onClose,
}: MainLayoutCreateProjectPromptProps) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="xs"
            PaperProps={{
                sx: {
                    borderRadius: 2,
                },
            }}
        >
            <DialogTitle sx={{ pr: 6, pb: 1.5 }}>
                Нужно войти в аккаунт
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
                    Чтобы создать проект, нужно войти в аккаунт.
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

export default MainLayoutCreateProjectPrompt;
