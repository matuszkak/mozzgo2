module.exports = {
  extends: 'universe',
  parser: 'babel-eslint',
  env: {
    'react-native/react-native': true,
  },
  plugins: ['react-hooks', 'auto-import', 'react-native'],
  rules: {
    'no-use-before-define': 'off',
    'react/jsx-filename-extension': 'off',
    'react/prop-types': 'off',
    'comma-dangle': 'off',
    'object-curly-newline': 'off',
    'no-trailing-spaces': 'off',
    'no-else-return': 'off',
    'no-console': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'react/jsx-props-no-spreading': 'off',
    'auto-import/auto-import': [
      2,
      {
        packages: {
          'react-native': {
            hasExports: 'react-native',
          },
        },
      },
    ],
  },
};
