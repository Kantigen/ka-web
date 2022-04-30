module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'airbnb'],
  globals: {
    YAHOO: true,
    jQuery: true,
    $: true,
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
};
