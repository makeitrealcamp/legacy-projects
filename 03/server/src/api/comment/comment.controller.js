const Post = require('../post/post.model')

const Comment = require('./comment.model')
const { createComment } = require('./comment.service')

async function createCommentHandler(req, res) {
  try {
    const id = req.user
    const { postId } = req.params
    const data = req.body
    const comment = await createComment(id, postId, data)
    const post = await Post.findById(postId)
    post.comments.push(comment)
    await post.save({ validateBeforeSave: false })
    const newComment = await Comment.findById(comment._id)
      .populate('author')
      .populate('post')
    return res
      .status(201)
      .json({ message: 'Comment created', data: newComment })
  } catch (e) {
    return res.status(400).json({ message: 'Comment not created', data: e })
  }
}

module.exports = { createCommentHandler }
