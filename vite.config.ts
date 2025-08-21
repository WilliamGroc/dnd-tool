import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(({ isSsrBuild, command }) => ({
  build: {
    rollupOptions: isSsrBuild
      ? {
        input: "./server/app.ts",
      }
      : undefined,
  },
  ssr: {
    noExternal: command === "build" ? true : undefined,
  },
  plugins: [
    tailwindcss(), reactRouter(), tsconfigPaths(),
    {
      name: "react-router-custom-express-server",
      config: () => ({
        build: {
          rollupOptions: isSsrBuild
            ? {
              input: { "assets/server-build.js": "virtual:react-router/server-build", "index.js": "./server/app.ts" },
              output: {
                entryFileNames: "[name]",
              },
            }
            : undefined,
        },
      }),
    },
    tsconfigPaths()],
}));