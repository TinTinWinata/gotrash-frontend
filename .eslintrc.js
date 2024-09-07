module.exports = {
  root: true,
  extends: '@react-native',
  plugins: ['unused-imports'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
    'react-native/no-inline-styles': 'off',
    'linebreak-style': 'off',
    'unused-imports/no-unused-imports': 'error',
  },
};
