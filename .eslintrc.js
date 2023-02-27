module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'next/core-web-vitals',
    'universe/native',
    'plugin:react-hooks/recommended',
    'turbo',
    'prettier',
  ],
  overrides: [
    {
      files: '*.js',
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
    'sort-keys-fix',
    'sort-destructure-keys',
    'simple-import-sort',
  ],
  rules: {
    '@next/next/no-html-link-for-pages': 'off',
    '@typescript-eslint/array-type': [
      'error',
      {
        default: 'generic',
      },
    ],
    '@typescript-eslint/consistent-type-imports': [
      'warn',
      {
        fixStyle: 'inline-type-imports',
      },
    ],
    'import/order': 'off',
    'react/jsx-sort-props': 'error',
    'simple-import-sort/exports': 'error',
    'simple-import-sort/imports': 'error',
    'sort-destructure-keys/sort-destructure-keys': 'error',
    'sort-keys-fix/sort-keys-fix': 'error',
  },
  settings: {
    next: {
      rootDir: ['apps/*/'],
    },
  },
}
