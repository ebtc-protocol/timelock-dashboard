module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['airbnb', 'plugin:prettier/recommended'],
  ignorePatterns: ['build/'],
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
    {
      env: {
        jest: true,
      },
      files: ['**/*.test.js'],
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
    'no-else-return': 'off',
    'prefer-template': 'off',
    'no-unused-vars': 'off',
  },
};
