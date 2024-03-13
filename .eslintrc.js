module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['airbnb', 'plugin:prettier/recommended'],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'react/prop-types': 'off',
    'no-console': 'off',
    'global-require': 'off',
    'no-nested-ternary': 'off',
    'import/no-dynamic-require': 'off',
    'no-restricted-syntax': 'off',
    'react/jsx-filename-extension': 'off',
    'react/no-deprecated': 'off',
  },
};
