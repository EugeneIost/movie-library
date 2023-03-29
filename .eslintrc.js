const a11yOff = Object.keys(require('eslint-plugin-jsx-a11y').rules).reduce(
  (acc, rule) => {
    acc[`jsx-a11y/${rule}`] = 'off';
    return acc;
  },
  {}
);

module.exports = {
  parser: '@babel/eslint-parser',
  settings: {
    'import/resolver': {
      webpack: {
        config: 'webpack.config.js',
      },
    },
  },
  env: {
    browser: true,
    node: true,
    screen: true,
  },
  extends: [
    'airbnb',
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
  ],
  plugins: ['prettier', 'react', 'react-hooks'],
  rules: {
    ...a11yOff,
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
    'react/jsx-closing-bracket-location': 'off',
    'react/jsx-closing-tag-location': 'off',
    'react/jsx-curly-spacing': 'off',
    'react/jsx-equals-spacing': 'off',
    'react/jsx-first-prop-new-line': 'off',
    'react/jsx-indent': 'off',
    'react/jsx-indent-props': 'off',
    'react/jsx-max-props-per-line': 'off',
    'react/jsx-tag-spacing': 'off',
    'react/jsx-wrap-multilines': 'off',
    'react/react-in-jsx-scope': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'no-console': 'off',
    'no-plusplus': 'off',
    'no-param-reassign': 'off',
    'no-restricted-exports': 'off',
    'react/prop-types': 'off',
    'import/prefer-default-export': 'off',
    'react/no-array-index-key': 'off',
    'react/function-component-definition': [
      2,
      {
        namedComponents: 'arrow-function',
      },
    ],
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.js', '.jsx'],
      },
    ],
  },
};
