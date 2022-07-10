module.exports = {
  env: {
    node: true,
    mocha: true
  },
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
    sourceType: "module",
    "ecmaVersion": 10
  }
}
