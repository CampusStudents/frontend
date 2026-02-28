import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import stylelint from "vite-plugin-stylelint";
import path from "node:path";

// https://vite.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            "@app": path.resolve(__dirname, "./src/app"),
            "@pages": path.resolve(__dirname, "./src/pages"),
            "@widgets": path.resolve(__dirname, "./src/widgets"),
            "@entities": path.resolve(__dirname, "./src/entities"),
            "@features": path.resolve(__dirname, "./src/features"),
            "@slices": path.resolve(__dirname, "./src/slices"),
            "@shared": path.resolve(__dirname, "./src/shared"),
        },
    },
    plugins: [
        react({
            babel: {
                plugins: [["babel-plugin-react-compiler"]],
            },
        }),
        stylelint(),
    ],
    test: {
        environment: "jsdom",
        setupFiles: ["./src/app/setupTests.ts"],
    },
});
