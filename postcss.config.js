module.exports = ({ file, options: { mode }, env }) => {
  const cssnanoOptions =
    mode === 'production'
      ? {
          preset: 'default',
          autoprefixer: false,
          reduceIdents: false // reduceIdents breaks animations sometimes
        }
      : false

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
