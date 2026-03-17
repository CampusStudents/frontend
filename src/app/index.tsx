import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router/dom";

import { Provider } from "./providers/theme";
import { routes } from "./routes";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <Provider>
            <RouterProvider router={routes} />
        </Provider>
    </StrictMode>,
);
