const app = require('./app')

const port = process.env.PORT || 3000
const isDevelopment = process.env.NODE_ENV !== 'production'

app.listen(port, () => {
  console.info(`Listening on ${port}`)

  if (isDevelopment) {
    const url = `http://localhost:${port}`
    const opn = require('opn')
    opn(url)
  }
})
