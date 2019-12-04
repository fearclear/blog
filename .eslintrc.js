module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs'
  ],
  // add your custom rules here
  rules: {
    'space-before-function-paren': ['error', 'never'],
    'vue/singleline-html-element-content-newline': 0
  }
}
