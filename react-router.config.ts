import type { Config } from "@react-router/dev/config";

export default {
  // Config options...
  // Server-side render by default, to enable SPA mode set this to `false`
  ssr: true,
  serverBuildFile: "assets/server-build.js", // 🚨 Dont forget this
} satisfies Config;
