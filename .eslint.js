module.exports = {
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  plugins: ['eslint', 'react-native', 'prettier'],
  parserOptions: {
    sourceType: 'module',
  },
  extends: [
    'plugin:eslint/recommended',
    'plugin:prettier/recommended', // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors.
    'prettier/react',
    'prettier/eslint',
  ],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx'],
      },
    },
  },
};
