module.exports = ({ file, options, env }) => {
  const cssnanoOptions = {
    preset: 'default'
  }

  // TODO: Only minimize for production build `env === production`
  // once https://github.com/postcss/postcss-loader/issues/353 is resolved
  // Currently `postcss-loader` doesn't respect webpack `mode` option.
  // Probably it's a webpack-cli issue

  return {
    plugins: {
      autoprefixer: true,
      cssnano: cssnanoOptions
    }
  }
}