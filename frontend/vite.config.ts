import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    // need proxy to pass cors (same uri for front and back => no cors problem)
    proxy: {
      "/api": {
        target: "htpp://back:3000",
        changeOrigin: true,
        secure: true,
      },
    },
  },
});
