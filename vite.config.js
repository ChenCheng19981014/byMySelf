import { defineConfig } from "vite";
// 引入@vitejs/plugin-legacy
import legacy from "@vitejs/plugin-legacy";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "node:url";
import path from "path";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: "./",
  resolve: {
    // 配置路径别名
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
