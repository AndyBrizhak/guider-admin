import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  server: {
    host: true,
    port: 3000, // Запуск локального сервера на порту 3000
  },
  build: {
    sourcemap: mode === "development",
  },
  base: "./",
}));
