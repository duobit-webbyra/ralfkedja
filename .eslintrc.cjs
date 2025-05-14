/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: [
    'next/core-web-vitals',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended', // Add this for TS rules
    'prettier',
  ],
  plugins: [
    '@typescript-eslint', // Add this for TS rules
  ],
  parser: '@typescript-eslint/parser', // Add this for TS rules
  parserOptions: {
    project: ['./tsconfig.json'],
    tsconfigRootDir: __dirname,
  },
  rules: {
    // Example: disable the TS unused-vars rule
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-expressions': 'off',
    // You can add more rule overrides here
  },
};
