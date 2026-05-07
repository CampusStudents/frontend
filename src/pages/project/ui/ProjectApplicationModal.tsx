import { CloseRounded } from "@mui/icons-material";
import {
    Box,
    Button,
    Fade,
    IconButton,
    Paper,
    Stack,
    TextField,
    Typography,
} from "@mui/material";

type ProjectApplicationModalProps = {
    open: boolean;
    message: string;
    onClose: () => void;
    onMessageChange: (value: string) => void;
    onSubmit: () => void;
};

const ProjectApplicationModal = ({
    open,
    message,
    onClose,
    onMessageChange,
    onSubmit,
}: ProjectApplicationModalProps) => {
    return (
        <Fade in={open} timeout={250} unmountOnExit>
            <Box
                onClick={onClose}
                sx={{
                    position: "fixed",
                    inset: 0,
                    zIndex: 20000,
                    bgcolor: "rgba(15, 18, 23, 0.56)",
                    backdropFilter: "blur(2px)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    p: 2,
                }}
            >
                <Paper
                    elevation={0}
                    onClick={(event) => event.stopPropagation()}
                    sx={{
                        width: "min(940px, calc(100vw - 32px))",
                        borderRadius: 2.5,
                        overflow: "hidden",
                    }}
                >
                    <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        sx={{
                            px: 2.5,
                            py: 1.5,
                            bgcolor: "#F5F7FB",
                            borderBottom: "1px solid",
                            borderColor: "divider",
                        }}
                    >
                        <Typography
                            sx={{
                                color: "primary.main",
                                fontWeight: 500,
                            }}
                        >
                            Подача заявки
                        </Typography>
                        <IconButton
                            onClick={onClose}
                            size="small"
                            sx={{
                                color: "text.secondary",
                            }}
                        >
                            <CloseRounded sx={{ fontSize: 20 }} />
                        </IconButton>
                    </Stack>

                    <Stack
                        useFlexGap
                        sx={{
                            p: { xs: 2, md: 3 },
                            gap: 3,
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: 18,
                                fontWeight: 500,
                            }}
                        >
                            Напишите сообщение:
                        </Typography>
                        <TextField
                            value={message}
                            onChange={(event) =>
                                onMessageChange(event.target.value)
                            }
                            multiline
                            minRows={7}
                            fullWidth
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    borderRadius: 2.5,
                                    bgcolor: "#FFFFFF",
                                },
                            }}
                        />
                        <Button
                            variant="contained"
                            onClick={onSubmit}
                            sx={{
                                minHeight: 56,
                                borderRadius: 1.75,
                                boxShadow: "none",
                                textTransform: "none",
                                fontSize: 18,
                                fontWeight: 500,
                            }}
                        >
                            Отправить
                        </Button>
                    </Stack>
                </Paper>
            </Box>
        </Fade>
    );
};

export default ProjectApplicationModal;
