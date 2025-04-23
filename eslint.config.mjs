import { defineConfig } from 'eslint/config';
import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import prettier from 'eslint-config-prettier';

export default defineConfig([
  // Base configuration for JavaScript/TypeScript and React files.
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    languageOptions: {
      globals: globals.browser,
    },
    settings: {
      react: {
        version: 'detect', // Automatically detects the React version
      },
    },
    plugins: {
      react: pluginReact,
    },
    rules: {
      'no-unused-vars': 'warn',
      'react/react-in-jsx-scope': 'off',
    },
  },

  // JavaScript recommended configuration from @eslint/js.
  js.configs.recommended,

  // TypeScript recommended configuration from typescript-eslint.
  // Note: ts-eslint config exports an array so we use the spread operator.
  ...tseslint.configs.recommended,

  // React recommended configuration for flat config.
  pluginReact.configs.flat.recommended,

  // Prettier configuration; should be last so it overrides conflicting rules.
  prettier,
]);

