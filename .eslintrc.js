module.exports = {
  root: true,
  rules: {
    "no-console": "off"
  },
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    "eslint:recommended",
    "plugin:vue/recommended",
  ]
}
