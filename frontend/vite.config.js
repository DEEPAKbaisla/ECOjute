
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Split node_modules into separate chunks
          if (id.includes("node_modules")) {
            if (id.includes("react-dom")) return "vendor-react-dom";
            if (id.includes("react-router")) return "vendor-router";
            if (id.includes("firebase")) return "vendor-firebase";
            if (id.includes("framer-motion")) return "vendor-framer";
            if (id.includes("swiper")) return "vendor-swiper";
            if (id.includes("react-icons")) return "vendor-icons";
            if (id.includes("axios")) return "vendor-axios";
            if (id.includes("@radix-ui")) return "vendor-radix";
            return "vendor-misc";
          }
        },
      },
    },
  },
});