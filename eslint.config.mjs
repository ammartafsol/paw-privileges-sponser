import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals"),
  {
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
    },
    linterOptions: {
      reportUnusedDisableDirectives: true, // Optional: Helps track unused ESLint disable comments
    },
  },
];

export default eslintConfig;
