const Post = require('./post.model')

function createPost(data, userId) {
  return Post.create({ ...data, user: userId })
}

function getPostsByUser(userId) {
  return Post.find({ user: userId })
}

function getAllPosts(limit, page) {
  return Post.paginate(
    {},
    {
      sort: '-createdAt',
      limit: limit || 20,
      page: page || 1,
      populate: [
        {
          path: 'comments',
          model: 'Comment',
          populate: [{ path: 'author', model: 'User' }],
        },
        { path: 'user', model: 'User' },
      ],
    }
  )
}

function updatePost(id, data) {
  return Post.findByIdAndUpdate(id, data, { new: true })
}

module.exports = { createPost, getPostsByUser, updatePost, getAllPosts }
