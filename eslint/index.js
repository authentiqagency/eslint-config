/* eslint-disable sort-keys/sort-keys-fix */
module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  extends: [
    "eslint:recommended",
    "plugin:jsonc/recommended-with-jsonc",
    "plugin:yml/standard",
    "plugin:markdown/recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:sonarjs/recommended",
    "plugin:security/recommended",
    "plugin:@next/next/recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:prettier/recommended",
  ],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  plugins: [
    "@typescript-eslint",
    "no-secrets",
    "import",
    "simple-import-sort",
    "typescript-sort-keys",
    "react",
    "sort-keys",
    "jsonc",
    "markdown",
    "yml",
    "tsdoc",
    "prettier",
  ],
  settings: {
    react: {
      version: "detect",
    },
  },
  rules: {
    // Prettier
    "prettier/prettier": ["warn", { usePrettierrc: true }],

    // Imports
    "import/first": "warn",
    "import/order": "off",
    "import/no-duplicates": "error",
    "simple-import-sort/exports": "warn",
    "sort-imports": "off",
    "simple-import-sort/imports": [
      "warn",
      {
        groups: [
          // Node.js builtins. You could also generate this regex if you use a `.js` config.
          // For example: `^(${require("module").builtinModules.join("|")})(/|$)`
          // Note that if you use the `node:` prefix for Node.js builtins,
          // you can avoid this complexity: You can simply use "^node:".
          [
            "^node:",
            // eslint-disable-next-line no-secrets/no-secrets
            "^(assert|buffer|child_process|cluster|console|constants|crypto|dgram|dns|domain|events|fs|http|https|module|net|os|path|punycode|querystring|readline|repl|stream|string_decoder|sys|timers|tls|tty|url|util|vm|zlib|freelist|v8|process|async_hooks|http2|perf_hooks)(/.*|$)",
          ],
          // External packages.
          ["^"],
          // q-core
          ["^@core(.*|$)"],
          // Internal packages.
          ["^(~)(.*|$)"],
          // Side effect imports.
          ["^\\u0000"],
          // Parent imports. Put `..` last.
          ["^\\.\\.(?!/?$)", "^\\.\\./?$"],
          // Other relative imports. Put same-folder imports and `.` last.
          ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
          // Style imports.
          ["^.+\\.s?css$"],
          // Styled components.
          ["^.+\\.styled\\.(j|t)sx?$", "^.+\\.styled$"],
          // JSON imports.
          ["^.+\\.jsonc?$"],
        ],
      },
    ],

    // Sort object keys
    "sort-keys": "off",
    "sort-keys/sort-keys-fix": "warn",

    // React
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",

    // Next
    "@next/next/no-document-import-in-page": "off",

    // Accessibility
    "jsx-a11y/anchor-is-valid": [
      "error",
      {
        components: ["Link"],
        specialLink: ["hrefLeft", "hrefRight"],
        aspects: ["invalidHref", "preferButton"],
      },
    ],

    // Security
    "no-secrets/no-secrets": "warn",
    "sonarjs/no-nested-template-literals": "off",

    // Bundle size
    "no-unused-vars": [
      "warn",
      { varsIgnorePattern: "^_", argsIgnorePattern: "^_" },
    ],
  },
  overrides: [
    // TypeScript
    {
      files: ["*.ts", "*.tsx", ".mts", ".mtsx", ".cts", ".ctsx"],
      parser: "@typescript-eslint/parser",
      parserOptions: {
        ecmaVersion: 2020,
        project: ["tsconfig.json"],
        ecmaFeatures: {
          jsx: true,
        },
      },
      rules: {
        // Sort type keys
        "typescript-sort-keys/interface": [
          "warn",
          "asc",
          {
            caseSensitive: true,
            natural: true,
            requiredFirst: true,
          },
        ],
        "typescript-sort-keys/string-enum": "warn",
      },
    },

    // Styled components
    {
      files: ["*styled.js", "*styled.ts", "*styled.jsx", "*styled.tsx"],
      rules: {
        "sort-keys": "off",
        "sort-keys-fix/sort-keys-fix": "off",
      },
    },

    // Standalone TypeScript
    {
      files: [
        "**/*.config.ts",
        "**/*.config.mts",
        "**/*.config.cts",
        "**/*.md/*.ts",
        "**/*.md/*.tsx",
        "**/*.md/*.mts",
        "**/*.md/*.mtsx",
        "**/*.md/*.cts",
        "**/*.md/*.ctsx",
        "**/*.d.ts",
      ],
      parserOptions: {
        createDefaultProgram: true,
      },
    },

    // settings.js
    {
      files: ["settings.js"],
      rules: {
        "sort-keys": "off",
        "sort-keys/sort-keys-fix": "off",
      },
    },

    // JSON
    {
      excludedFiles: ["package-lock.json", "yarn.lock"],
      files: ["*.json", "*.json5", "*.jsonc"],
      parser: "jsonc-eslint-parser",
      rules: {
        "jsonc/comma-dangle": ["error", "never"], // Trailing comma is invalid in JSON
        "jsonc/sort-keys": [
          "warn",
          "asc",
          {
            caseSensitive: false,
            minKeys: 2,
            natural: true,
          },
        ],
      },
    },

    // Package json
    {
      files: ["package.json"],
      rules: {
        "jsonc/sort-keys": [
          "warn",
          {
            order: {
              caseSensitive: true,
              natural: true,
              type: "asc",
            },
            pathPattern: "^.*..*$",
          },
          {
            order: [
              "version",
              "type",
              "name",
              "displayName",
              "description",
              "license",
              "author",
              "funding",
              "private",
              "homepage",
              "repository",
              "bugs",
              "sideEffects",
              "exports",
              "main",
              "bin",
              "module",
              "unpkg",
              "jsdelivr",
              "types",
              "scripts",
              "engines",
              "files",
              "peerDependencies",
              "peerDependenciesMeta",
              "dependencies",
              "optionalDependencies",
              "overrides",
              "devDependencies",
              "keywords",
              "volta",
              {
                order: {
                  caseSensitive: true,
                  natural: true,
                  type: "asc",
                },
              },
            ],
            pathPattern: "^$",
          },
          {
            order: ["types", "require", "import"],
            pathPattern: "^exports.*$",
          },
        ],
      },
    },

    // TSConfig json
    {
      files: ["tsconfig.json", "tsconfig.*.json"],
      rules: {
        "jsonc/sort-keys": [
          "warn",
          {
            order: {
              caseSensitive: true,
              natural: true,
              type: "asc",
            },
            pathPattern: "^.*..*$",
          },
          {
            order: ["extends", "compilerOptions", "include", "exclude"],
            pathPattern: "^$",
          },
        ],
      },
    },

    // eslintrc json
    {
      files: [".eslintrc.json", "eslintrc.json"],
      rules: {
        "jsonc/sort-keys": [
          "warn",
          {
            order: {
              caseSensitive: true,
              natural: true,
              type: "asc",
            },
            pathPattern: "^.*..*$",
          },
          {
            order: ["extends", "plugins", "overrides", "rules"],
            pathPattern: "^$",
          },
        ],
      },
    },

    // YAML
    {
      excludedFiles: ["pnpm-lock.yaml"],
      files: ["*.yaml", "*.yml"],
      parser: "yaml-eslint-parser",
      rules: {
        "yml/quotes": ["warn", { avoidEscape: true, prefer: "double" }],
        "yml/sort-keys": [
          "warn",
          "asc",
          {
            caseSensitive: false,
            minKeys: 2,
            natural: true,
          },
        ],
      },
    },

    // Markdown
    {
      files: ["**/*.md"],
      processor: "markdown/markdown",
    },
    {
      files: [
        "**/*.md/*.ts",
        "**/*.md/*.tsx",
        "**/*.md/*.mts",
        "**/*.md/*.mtsx",
        "**/*.md/*.cts",
        "**/*.md/*.ctsx",
        "**/*.md/*.js",
        "**/*.md/*.jsx",
        "**/*.md/*.mjs",
        "**/*.md/*.mjsx",
        "**/*.md/*.cjs",
        "**/*.md/*.cjsx",
      ],
    },
  ],
};
