import js from "@eslint/js";
import tseslint from "typescript-eslint";
import prettier from "eslint-plugin-prettier";
import importPlugin from "eslint-plugin-import";
import simpleImportSort from "eslint-plugin-simple-import-sort";

export default [
  js.configs.recommended,

  ...tseslint.configs.recommended,

  {
    files: ["**/*.ts"],

    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: "./tsconfig.json",
      },
    },

    plugins: {
      prettier,
      import: importPlugin,
      "simple-import-sort": simpleImportSort,
    },

    rules: {
      indent: ["error", 2, { SwitchCase: 1 }],

      quotes: ["error", "double"],

      semi: ["error", "always"],

      "@typescript-eslint/no-explicit-any": "off",

      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "req|res|next",
        },
      ],

      "@typescript-eslint/return-await": [
        "error",
        "always",
      ],

      "simple-import-sort/imports": "error",

      "import/first": "error",

      "import/newline-after-import": [
        "error",
        { count: 1 },
      ],

      "import/no-duplicates": "error",

      "prettier/prettier": [
        "error",
        {
          endOfLine: "auto",
        },
      ],

      "no-console": "warn",

      "sort-imports": [
        "error",
        {
          ignoreCase: true,
          ignoreDeclarationSort: true,
          ignoreMemberSort: false,
          memberSyntaxSortOrder: [
            "none",
            "all",
            "multiple",
            "single",
          ],
          allowSeparatedGroups: false,
        },
      ],
    },
  },

  {
    ignores: [
      "dist/**",
      "data/**",
    ],
  },
];