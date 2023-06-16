const user = require('./api/user/user.route')
const genre = require('./api/genre/genre.route')
const post = require('./api/post/post.route')
const comment = require('./api/comment/comment.route')
const contract = require('./api/contract/contract.route')
const connection = require('./api/connection/connection.route')
const message = require('./api/message/message.route')
const plan = require('./api/plan/plan.route')

const routesConfig = (app) => {
  app.use('/auth/local', user)
  app.use('/api/users', user)
  app.use('/api/genres', genre)
  app.use('/api/posts', post)
  app.use('/api/comments', comment)
  app.use('/api/contracts', contract)
  app.use('/api/connections', connection)
  app.use('/api/messages', message)
  app.use('/api/plans', plan)
}

module.exports = { routesConfig }
