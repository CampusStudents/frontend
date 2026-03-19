import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";

import App from "@app/App.tsx";
import { ThemeProvider } from "@app/providers/theme";

createRoot(document.getElementById("root")!).render(
    <BrowserRouter>
        <ThemeProvider>
            <App />
        </ThemeProvider>
    </BrowserRouter>,
);
