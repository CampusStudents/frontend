import { CloseRounded } from "@mui/icons-material";
import {
    Box,
    Button,
    Fade,
    IconButton,
    MenuItem,
    Paper,
    Stack,
    TextField,
    Typography,
} from "@mui/material";

type ProjectApplicationModalProps = {
    open: boolean;
    message: string;
    selectedVacancyId: string;
    vacancies: Array<{
        id: string;
        title: string;
    }>;
    isSubmitting?: boolean;
    onClose: () => void;
    onMessageChange: (value: string) => void;
    onVacancyChange: (value: string) => void;
    onSubmit: () => void;
};

const ProjectApplicationModal = ({
    open,
    message,
    selectedVacancyId,
    vacancies,
    isSubmitting = false,
    onClose,
    onMessageChange,
    onVacancyChange,
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
                    alignItems: { xs: "flex-start", sm: "center" },
                    justifyContent: "center",
                    overflowY: "auto",
                    p: { xs: 1.5, sm: 2 },
                    py: { xs: 2, sm: 4 },
                }}
            >
                <Paper
                    elevation={0}
                    onClick={(event) => event.stopPropagation()}
                    sx={{
                        width: "min(640px, calc(100vw - 32px))",
                        maxHeight: "calc(100vh - 32px)",
                        borderRadius: 2.5,
                        overflow: "hidden",
                        display: "flex",
                        flexDirection: "column",
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
                            overflowY: "auto",
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
                            select
                            fullWidth
                            label="Р РѕР»СЊ"
                            value={selectedVacancyId}
                            disabled={isSubmitting || vacancies.length === 0}
                            onChange={(event) =>
                                onVacancyChange(event.target.value)
                            }
                        >
                            {vacancies.map((vacancy) => (
                                <MenuItem key={vacancy.id} value={vacancy.id}>
                                    {vacancy.title}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            value={message}
                            disabled={isSubmitting}
                            onChange={(event) =>
                                onMessageChange(event.target.value)
                            }
                            multiline
                            minRows={5}
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
                            disabled={isSubmitting || !selectedVacancyId}
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
