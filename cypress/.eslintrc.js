module.exports = {
  extends: ['../.eslintrc.js'],
  env: {
    'cypress/globals': true
  },
  plugins: ['cypress', 'chai-friendly'],
  rules: {
    'no-unused-expressions': 0,
    'chai-friendly/no-unused-expressions': 2
  }
}
