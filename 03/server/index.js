const server = require('./src/app')
const { transporter, verify } = require('./src/utils/mailer')

const PORT = process.env.PORT || 8080
const NODE_ENV = process.env.NODE_ENV || 'development'

server.listen(PORT, async () => {
  verify(transporter)
  console.log(
    `The Server is runnig on port: http://localhost:${PORT} in ${NODE_ENV} mode`
  )
})
