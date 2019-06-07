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
    '@nuxtjs',
//    'plugin:nuxt/recommended',
//    'plugin:prettier/recommended',
//    'prettier',
//    'prettier/vue'
  ],
  plugins: [
    'vue'
//    'prettier'
  ],
  // add your custom rules here
  rules: {
    'no-console': 'off',
    'semi':  ['error', 'always'],
    'space-before-function-paren': 'off',
    'nuxt/no-cjs-in-config': 'off'
  }
}
