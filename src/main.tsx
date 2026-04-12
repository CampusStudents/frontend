import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { QueryClientProvider } from "@tanstack/react-query";

import App from "@app/App.tsx";
import { ThemeProvider } from "@app/providers/theme";
import { queryClient } from "@shared/api";

createRoot(document.getElementById("root")!).render(
    <QueryClientProvider client={queryClient}>
        <BrowserRouter>
            <ThemeProvider>
                <App />
            </ThemeProvider>
        </BrowserRouter>
    </QueryClientProvider>,
);
