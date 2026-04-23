import ReplayRoundedIcon from "@mui/icons-material/ReplayRounded";
import { Button, Collapse, Stack, Typography } from "@mui/material";

import { EmptyState } from "@shared/ui/EmptyState";

type ErrorFallbackProps = {
    title?: string;
    description?: string;
    error?: Error;
    onRetry?: () => void;
};

const ErrorFallback = ({
    title = "Что-то пошло не так",
    description = "Во время рендера страницы произошла ошибка. Попробуйте повторить действие или перейти на другой экран.",
    error,
    onRetry,
}: ErrorFallbackProps) => {
    return (
        <Stack spacing={2} sx={{ py: 3 }}>
            <EmptyState title={title} description={description} />
            {onRetry ? (
                <Button
                    variant="outlined"
                    startIcon={<ReplayRoundedIcon />}
                    onClick={onRetry}
                    sx={{ alignSelf: "flex-start" }}
                >
                    Попробовать снова
                </Button>
            ) : null}
            <Collapse in={Boolean(import.meta.env.DEV && error?.message)}>
                <Typography
                    variant="body2"
                    sx={{
                        color: "text.secondary",
                        whiteSpace: "pre-wrap",
                        wordBreak: "break-word",
                    }}
                >
                    {error?.message}
                </Typography>
            </Collapse>
        </Stack>
    );
};

export default ErrorFallback;
