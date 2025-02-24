const Post = require('../models/Post');

const findMostViewed = async (req, res, next) => {
  try {
    const posts = await Post.find()
                            .sort({ views: -1 })
                            .limit(10);

    if (posts.length === 0) {
      const err = new Error("Hali hech qanday post topilmadi");
      err.statusCode = 404;
      return next(err);
    }

    res.json(posts);
  } catch (error) {
    next(error);
  }
};

module.exports = { findMostViewed };
