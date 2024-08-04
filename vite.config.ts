import { defineConfig, splitVendorChunkPlugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      // Match requests starting with '/images'
      "/heroImage": {
        // Target URL of the TMDB image server
        target: "https://image.tmdb.org/t/p/w1280/",
        // Change origin to match your development server
        changeOrigin: true,
        // Optional: handle rewrites for cleaner paths (if needed)
        rewrite: (path) => path.replace(/^\/heroImage/, ""),
      },
    },
  },
  plugins: [react(), splitVendorChunkPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          // creating a chunk to @open-ish deps. Reducing the vendor chunk size
          if (id.includes("@open-ish") || id.includes("tslib")) {
            return "@open-ish";
          }
          // creating a chunk to react routes deps. Reducing the vendor chunk size
          if (
            id.includes("react-router-dom") ||
            id.includes("@remix-run") ||
            id.includes("react-router")
          ) {
            return "@react-router";
          }
        },
      },
    },
  },
});
