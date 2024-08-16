module.exports = {
  root: true,
  extends: '@react-native',
  plugins: ['unused-imports'],
  rules: {
    'react-native/no-inline-styles': 'off',
    'linebreak-style': ['error', 'unix'],
    'unused-imports/no-unused-imports': 'error',
  },
};
