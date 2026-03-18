import * as path from "node:path";

import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import stylelint from "vite-plugin-stylelint";

export default defineConfig({
    resolve: {
        alias: {
            "@app": path.resolve(__dirname, "./src/app"),
            "@pages": path.resolve(__dirname, "./src/pages"),
            "@widgets": path.resolve(__dirname, "./src/widgets"),
            "@features": path.resolve(__dirname, "./src/features"),
            "@entities": path.resolve(__dirname, "./src/entities"),
            "@shared": path.resolve(__dirname, "./src/shared"),
        },
    },

    plugins: [
        react({
            babel: {
                plugins: ["babel-plugin-react-compiler"],
            },
        }),

        stylelint({
            include: ["src/**/*.{css,scss}"],
        }),
    ],
});
