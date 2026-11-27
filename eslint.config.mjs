import nextCoreWebVitals from 'eslint-config-next/core-web-vitals'
import prettierRecommended from 'eslint-plugin-prettier/recommended'
import js from '@eslint/js'
import globals from 'globals'

export default [
  { ignores: ['.next/**', 'node_modules/**', 'public/**', 'out/**'] },
  js.configs.recommended,
  ...nextCoreWebVitals,
  prettierRecommended,
  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.node, ...globals.amd },
    },
    rules: {
      'prettier/prettier': 'error',
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 0,
      'no-unused-vars': 0,
      'react/no-unescaped-entities': 0,
      // New React Compiler rules in eslint-plugin-react-hooks v7; existing code predates them
      'react-hooks/set-state-in-effect': 'warn',
      'react-hooks/static-components': 'warn',
    },
  },
]
