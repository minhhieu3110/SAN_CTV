module.exports = {
  root: true,
  extends: '@react-native',
  rules: {
    'react-hooks/exhaustive-deps': 'warn',
    'react-native/no-inline-styles': 'off',
    '@typescript-eslint/no-non-null-assertion': 'error',
    '@typescript-eslint/no-unnecessary-condition': 'error',
  },
};
