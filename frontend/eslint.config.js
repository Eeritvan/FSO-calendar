import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    plugins: { js },
    extends: ["js/recommended"] },
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    languageOptions:{ globals: globals.browser }
  },
  tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,

  { ignores: ["build", ".react-router"] },
  {
    rules: {
      semi: ["error", "always"],
      quotes: ["error", "double"],
      indent: ["error", 2],
      eqeqeq: ["error"],
      camelcase: ["error", { "properties": "always" }],
      "no-trailing-spaces": ["error"],
      "linebreak-style": ["error", "unix"],
      "arrow-spacing": ["error", { "before": true, "after": true }],
      "object-curly-spacing": ["error", "always"],
      "max-len": ["error", 80],
      "no-console": ["error"],
      "no-duplicate-imports": ["error"],
      "no-multiple-empty-lines": ["error", { "max": 1 }],
      "eol-last": ["error", "always"],
      "comma-dangle": ["error", "never"],
      "max-depth": ["error", 2],
      "no-else-return": ["error"],
      "comma-spacing": ["error", { "before": false, "after": true }],
      "no-var": ["error"],
      "prefer-const": ["error"],
      "react/jsx-closing-bracket-location": ["error"],
      "react/prefer-stateless-function": ["error"],
      "react/no-multi-comp": ["error"],
      "react/sort-comp": ["error"],
      "react/self-closing-comp": ["error"],
      "react/jsx-wrap-multilines": ["error"]
    }
  }
]);
