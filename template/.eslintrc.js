module.exports = {
  root: true,

  extends: [
    '@react-native-community',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  rules: {
    'react-hooks/exhaustive-deps': 'off',
    'eslint-comments/no-unused-disable': 'off',
    'jsx-quotes': [2, 'prefer-single'],
    'no-shadow': 'off',
    'no-duplicate-imports': 'error',
    '@typescript-eslint/explicit-module-boundary-types': 0,
    // new rules
    'react-native/no-unused-styles': 1,
    'react-native/no-inline-styles': 0,
    'react/no-unstable-nested-components': [
      'warn',
      {
        allowAsProps: true,
        customValidators: [],
      },
    ],
  },
  overrides: [
    {
      files: ['*.{ts.tsx}'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: './tsconfig.eslint.json',
      },
      plugins: ['@typescript-eslint'],
    },
  ],
  env: {
    browser: true,
    es2021: true,
  },
};
