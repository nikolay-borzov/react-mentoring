module.exports = {
  root: true,
  env: {
    jest: true,
    browser: true
  },
  globals: {
    API_URL: true,
    // Enzyme
    shallow: true,
    render: true,
    mount: true
  },
  plugins: ['react'],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    }
  },
  extends: ['prettier-standard', 'plugin:react/recommended']
}
