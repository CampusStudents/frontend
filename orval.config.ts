import { defineConfig } from "orval";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
    api: {
        input: {
            target: `${process.env.VITE_API_URL}/openapi.json`,
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
