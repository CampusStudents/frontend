import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";

import App from "@app/App.tsx";
import { ThemeProvider } from "@app/providers/theme";
import { buildInterceptors } from "@app/providers/auth";
import { queryClient } from "@shared/api";
import { ErrorBoundary } from "@shared/ui/ErrorBoundary";
import { ErrorFallback } from "@shared/ui/ErrorFallback";

buildInterceptors();

createRoot(document.getElementById("root")!).render(
    <HelmetProvider>
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <ThemeProvider>
                    <ErrorBoundary
                        onError={(error, errorInfo) => {
                            console.error("Ошибка на уровне приложения", {
                                error,
                                componentStack: errorInfo.componentStack,
                            });
                        }}
                        fallback={({ error, reset }) => (
                            <ErrorFallback
                                title="Приложение временно недоступно"
                                description="Произошла критическая ошибка на верхнем уровне приложения. Попробуйте перерисовать экран."
                                error={error}
                                onRetry={reset}
                            />
                        )}
                    >
                        <App />
                    </ErrorBoundary>
                </ThemeProvider>
            </BrowserRouter>
        </QueryClientProvider>
    </HelmetProvider>,
);
