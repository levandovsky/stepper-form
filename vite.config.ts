/// <reference types="vitest" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfig from "./tsconfig.json";

const alias = Object.entries(tsconfig.compilerOptions.paths).reduce((acc, [key, value]) => {
    const alias = key.replace("/*", "");
    const path = value[0].replace("/*", "");

    return {
        ...acc,
        [alias]: path,
    };
}, {});

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias,
    },
    test: {
        globals: true,
        environment: "jsdom",
    },
});
