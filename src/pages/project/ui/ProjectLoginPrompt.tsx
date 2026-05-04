import { CloseRounded } from "@mui/icons-material";
import {
    Box,
    Button,
    Fade,
    IconButton,
    Paper,
    Stack,
    Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

import type { ProjectLoginPromptContent } from "../model/uiTypes";

import { routePaths } from "@shared/config";

type ProjectLoginPromptProps = {
    content: ProjectLoginPromptContent | null;
    open: boolean;
    onClose: () => void;
};

const ProjectLoginPrompt = ({
    content,
    open,
    onClose,
}: ProjectLoginPromptProps) => {
    return (
        <Fade in={open} timeout={250} unmountOnExit>
            <Box
                onClick={onClose}
                sx={{
                    position: "fixed",
                    inset: 0,
                    zIndex: 20005,
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
                        width: "min(420px, calc(100vw - 32px))",
                        borderRadius: 2,
                    }}
                >
                    <Typography
                        component="div"
                        sx={{
                            position: "relative",
                            pr: 6,
                            pb: 1.5,
                            px: 3,
                            pt: 3,
                            fontSize: 20,
                            fontWeight: 500,
                        }}
                    >
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
                        {content?.title}
                    </Typography>

                    <Stack
                        useFlexGap
                        sx={{
                            px: 3,
                            pb: 3,
                            gap: 3,
                        }}
                    >
                        <Typography
                            sx={{
                                color: "text.secondary",
                                lineHeight: 1.6,
                            }}
                        >
                            {content?.description}
                        </Typography>
                        <Stack
                            direction="row"
                            justifyContent="flex-end"
                            spacing={1.5}
                        >
                            <Button onClick={onClose} color="inherit">
                                Позже
                            </Button>
                            <Button
                                component={RouterLink}
                                to={routePaths.login}
                                variant="contained"
                                onClick={onClose}
                                sx={{
                                    boxShadow: "none",
                                }}
                            >
                                Войти
                            </Button>
                        </Stack>
                    </Stack>
                </Paper>
            </Box>
        </Fade>
    );
};

export default ProjectLoginPrompt;
