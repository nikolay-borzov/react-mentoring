module.exports = ({ file, options, env }) => {
  const cssnanoOptions = {
    preset: 'default',
    autoprefixer: false,
    reduceIdents: false // reduceIdents sometimes breaks animations
  }

  // TODO: Only minimize for production build `env === production`
  // once https://github.com/postcss/postcss-loader/issues/353 is resolved
  // Currently `postcss-loader` doesn't respect webpack `mode` option.
  // Probably it's a webpack-cli issue

  return {
    plugins: {
      'postcss-import': {},
      'postcss-cssnext': {
        features: {
          customProperties: {
            preserve: true,
            // https://github.com/MoOx/postcss-cssnext/issues/186
            warnings: true
          }
        }
      },
      cssnano: cssnanoOptions
    }
  }
}
