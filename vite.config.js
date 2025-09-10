import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Your CrudCrud API base
const CRUDCRUD_API = "https://crudcrud.com/api/abcd1234efgh5678";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://crudcrud.com/api/abcd1234efgh5678",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""), // remove /api prefix
      },
    },
  },
});
