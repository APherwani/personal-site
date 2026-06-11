import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://arjunpherwani.dev",
  integrations: [sitemap()],
  output: "static",
});
