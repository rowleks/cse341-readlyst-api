import eslint from '@eslint/js'
import eslintConfigPrettier from 'eslint-config-prettier'
import pluginPrettier from 'eslint-plugin-prettier'
import globals from 'globals'

export default [
  {
    ignores: [
      'node_modules',
      'git',
      'dist',
      'build',
      'coverage',
      '*.log',
      'requests',
    ],
  },
  eslint.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
    rules: {
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'no-var': 'error',
      'prefer-const': 'warn',
      eqeqeq: ['error', 'always'],
      'no-eq-null': 'error',
      'no-eval': 'error',
      'no-implied-eval': 'error',
      'no-new-func': 'error',
      'require-await': 'error',
      'arrow-body-style': ['error', 'as-needed'],
      'no-console': 'warn',
      'no-path-concat': 'error',
      'handle-callback-err': 'warn',
      'object-shorthand': ['warn', 'always'],
      'prefer-arrow-callback': 'warn',
      'prefer-template': 'warn',
      'prefer-rest-params': 'warn',
      'prefer-spread': 'warn',
      'prefer-destructuring': ['warn', { object: true, array: false }],
      'prefer-object-spread': 'warn',
      'func-style': ['warn', 'expression', { allowArrowFunctions: true }],
      'arrow-spacing': ['error', { before: true, after: true }],
    },
  },
  {
    plugins: {
      prettier: pluginPrettier,
    },
    rules: {
      'prettier/prettier': 'error',
    },
  },
  eslintConfigPrettier,
]
