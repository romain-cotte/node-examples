module.exports = {
  "env": {
    "es6": true,
    "node": true,
    "mocha": true
  },
  "extends": "eslint:recommended",
  "parserOptions": { "sourceType": "module" },
  "rules": {
    "indent": [2, 2, { "SwitchCase": 1 }],
    "linebreak-style": [ 2, "unix" ],
    "quotes": [ 2, "single" ],
    "semi": [ 2, "never" ],
    "flow-vars/define-flow-type": 1,
    "flow-vars/use-flow-type": 1
  },
  "plugins": ["flow-vars"],
  "parser": "babel-eslint"
}
