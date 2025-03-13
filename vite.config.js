import { defineConfig } from "vite";

export default defineConfig({
  root: "./src",
  publicDir: "../public",
  build: {
    minify: true,
    outDir: "../build",
    rollupOptions: {
      input: {
        main: "./src/index.html",
        about: "./src/about.html",
        shop: "./src/shop.html",
        blog: "./src/blog.html",
        catalog: "./src/catalog.html",
      },
    },
  },
});
