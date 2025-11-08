import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  {
    // Custom rules go here
    rules: {
      // Disable the "no-explicit-any" rule completely
      "@typescript-eslint/no-explicit-any": "off",

      // OR: Show as a warning instead of error
      // "@typescript-eslint/no-explicit-any": "warn",

      // OR: allow `any` only in rest arguments
      // "@typescript-eslint/no-explicit-any": ["error", { "ignoreRestArgs": true }],
    },
  },
]);

export default eslintConfig;
