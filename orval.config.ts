import { defineConfig } from "orval";
import * as dotenv from "dotenv";

dotenv.config();

const apiUrl = process.env.VITE_API_URL || "http://localhost";

export default defineConfig({
    api: {
        input: {
            target: `${apiUrl}/api/openapi.json`,
        },
        output: {
            target: "./src/shared/api/generated",
            schemas: "./src/shared/api/generated/model",
            client: "react-query",
            mock: true,
            override: {
                mutator: {
                    path: "./src/shared/api/axios.ts",
                    name: "customInstance",
                },
            },
        },
    },
});
