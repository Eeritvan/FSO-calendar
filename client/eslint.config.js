import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  tseslint.configs.strict,
  tseslint.configs.stylistic,
  { ignores: ['dist', 'src/components/ui'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      semi: ['error', 'never'],
      quotes: ['error', 'single'],
      indent: ['error', 2],
      camelcase: ['error', { 'properties': 'always' }],
      'no-trailing-spaces': 'error',
      'linebreak-style': ['error', 'unix'],
      'arrow-spacing': ['error', { 'before': true, 'after': true }],
      'object-curly-spacing': ['error', 'always'],
      'max-len': ["error", 80],
      'no-console': ['error'],
      'no-duplicate-imports': ['error'],
      'no-multiple-empty-lines': ['error', { 'max': 1 }],
      "eol-last": ["error", "always"],
      'comma-dangle': ['error', 'never']
    },
  },
)
