const {
  createPost,
  getPostsByUser,
  getAllPosts,
  updatePost,
} = require('./post.service')
const User = require('../user/user.model')

async function createPostHandler(req, res) {
  try {
    const id = req.user
    const data = req.body
    const post = await createPost(data, id)
    const user = await User.findById(id)
    user.posts.push(post)
    await user.save({ validateBeforeSave: false })
    return res.status(201).json({ message: 'Post created', data: post })
  } catch (e) {
    return res.status(400).json({ message: 'Post not created', data: e })
  }
}

async function getPostsByUserHandler(req, res) {
  try {
    const id = req.user
    const posts = await getPostsByUser(id)
    return res.status(200).json({ message: 'Posts found', data: posts })
  } catch (e) {
    return res.status(400).json({ message: 'Post not found', data: e })
  }
}

async function updatePostHandler(req, res) {
  try {
    const data = req.body
    const { postId } = req.params
    const post = await updatePost(postId, data)
    return res.status(200).json({ message: 'Posts updated', data: post })
  } catch (e) {
    return res.status(400).json({ message: 'Post not updated', data: e })
  }
}

async function getAllPostsHandler(req, res) {
  try {
    const { limit, page } = req.query
    const posts = await getAllPosts(limit, page)
    return res.status(200).json({ message: 'Posts found', data: posts })
  } catch (e) {
    return res.status(400).json({ message: 'Post not found', data: e })
  }
}

module.exports = {
  createPostHandler,
  updatePostHandler,
  getPostsByUserHandler,
  getAllPostsHandler,
}
