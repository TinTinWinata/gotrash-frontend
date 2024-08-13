module.exports = {
  root: true,
  extends: '@react-native',
  plugins: ['unused-imports'],
  rules: {
    'prettier/prettier': ['error', {endOfLine: 'lf'}],
    'react-native/no-inline-styles': 'off',
    'unused-imports/no-unused-imports': 'error', // Flag and remove unused imports
  },
};
