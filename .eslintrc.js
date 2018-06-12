module.exports = {
  root: true,
  env: {
    jest: true,
    browser: true
  },
  globals: {
    API_URL: true,
    IS_DEVELOPMENT: true,
    IS_SERVER: true,
    // Enzyme
    shallow: true,
    render: true,
    mount: true
  },
  plugins: ['react', 'flowtype'],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    }
  },
  extends: [
    'prettier-standard',
    'plugin:react/recommended',
    'plugin:flowtype/recommended'
  ]
}
