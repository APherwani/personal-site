import js from "@eslint/js";
import astro from "eslint-plugin-astro";
import tseslint from "typescript-eslint";

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...astro.configs.recommended,
  {
    ignores: [
      "dist/**",
      "node_modules/**",
      ".astro/**",
      "playwright-report/**",
      "test-results/**"
    ],
  },
  {
    files: ["**/*.ts", "**/*.mts", "**/*.astro"],
    rules: {
      "no-console": ["error", { "allow": ["warn", "error"] }]
    }
  }
];
