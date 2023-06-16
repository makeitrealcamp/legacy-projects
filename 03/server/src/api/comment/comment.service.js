const Comment = require('./comment.model')

function createComment(authorId, postId, data) {
  return Comment.create({ ...data, author: authorId, post: postId })
}

module.exports = { createComment }
