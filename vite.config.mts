import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "url";

export default defineConfig(({ mode }) => {
    // Load environment variables
    const env = loadEnv(mode, process.cwd());

    return {
        base: "/",
        plugins: [react()],
        build: {
            chunkSizeWarningLimit: 1600,
            rollupOptions: {
                output: {
                    manualChunks(id) {
                        if (id.includes("node_modules")) {
                            return id
                                .toString()
                                .split("node_modules/")[1]
                                .split("/")[0]
                                .toString();
                        }
                    },
                },
            },
        },
        resolve: {
            alias: [
                {
                    find: "@",
                    replacement: fileURLToPath(new URL("./src", import.meta.url)),
                },
            ],
        },
        server: {
            proxy: {
                "/api": env.VITE_BACKEND_URL, // Ensure requests go to the backend
            },
        },
    };
});
