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
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    project: './tsconfig.json'
  },
  plugins: ['react', 'prettier', '@typescript-eslint', 'flowtype'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'prettier-standard',
    'plugin:react/recommended',
    'prettier/@typescript-eslint'
  ]
}
