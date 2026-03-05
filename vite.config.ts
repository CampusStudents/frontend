import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import stylelint from "vite-plugin-stylelint";
import path from "node:path";

// https://vite.dev/config/
export default defineConfig({
    resolve: {
        alias: [{ find: "/vite.svg", replacement: path.resolve("./public/vite.svg") }],
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
        setupFiles: ["./src/setupTests.ts"],
    },
});
