module.exports = {
  env: {
    es6: true,
    node: true,
    mocha: true
  },
  extends: 'eslint:recommended',
  rules: {
    indent: [2, 2, { 'SwitchCase': 1 }],
    'linebreak-style': [ 2, 'unix' ],
    quotes: [ 2, 'single' ],
    semi: [ 2, 'always' ],
    'no-unused-vars': [
      'error', { 'argsIgnorePattern': '^_' },
    ],
  },
  parserOptions: {
    ecmaVersion: 2017
  }
}
