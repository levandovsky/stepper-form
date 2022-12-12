import { UserConfigExport } from "vite";
import { UserConfig } from "vitest";
import react from "@vitejs/plugin-react";
import tsconfig from "./tsconfig.json";

type ViteConfig = UserConfigExport & {
    test: UserConfig;
};

const alias = Object.entries(tsconfig.compilerOptions.paths).reduce((acc, [key, value]) => {
    const alias = key.replace("/*", "");
    const path = value[0].replace("/*", "");

    return {
        ...acc,
        [alias]: path,
    };
}, {});

const config: ViteConfig = {
    plugins: [react()],
    optimizeDeps: {
        force: true,
    },
    resolve: {
        alias,
    },
    test: {
        globals: true,
        environment: "jsdom",
    },
}

export default config;