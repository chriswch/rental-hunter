import { cp } from "node:fs/promises";
import { defineConfig } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
  srcDir: "src",
  modules: ["@wxt-dev/module-react"],
  hooks: {
    "build:done": async () => {
      await cp(
        ".output/chrome-mv3-dev/",
        "/mnt/c/Users/wmike/Downloads/chrome-mv3-dev",
        {
          recursive: true,
        },
      );
    },
  },
});
