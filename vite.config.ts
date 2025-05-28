import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@": "/src",
            "@features": "/src/features",
            "@services": "/src/services",
            "@tabler/icons-react": "@tabler/icons-react/dist/esm/icons/index.mjs",
        },
    },
});
