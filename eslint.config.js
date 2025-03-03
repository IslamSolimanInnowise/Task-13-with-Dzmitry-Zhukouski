import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import i18next from 'eslint-plugin-i18next';
import noComments from 'eslint-plugin-no-comments';
import prettier from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      prettier,
    ],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    settings: {
      react: { version: 'detect' },
      'import/resolver': {
        typescript: {
          project: ['./tsconfig.app.json', './tsconfig.node.json'],
        },
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'simple-import-sort': simpleImportSort,
      i18next,
      'no-comments': noComments,
      import: importPlugin,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'simple-import-sort/imports': 'warn',
      'simple-import-sort/exports': 'warn',
      // 'i18next/no-literal-string': ['error', { markupOnly: true }],
      'import/no-cycle': ['error', { maxDepth: Infinity }],
      'no-console': 'error',
      'no-debugger': 'error',
      'no-inline-comments': 'error',
      'no-warning-comments': 'error',
      'no-comments/disallowComments': 'error',
      'no-alert': 'error',
    },
  },
);
