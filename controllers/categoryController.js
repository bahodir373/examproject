const Post = require('../models/Post');

const findCategory = async (req, res, next) => {
  try {
    const category = req.params.category;

    const allowedCategories = ["sud-huquq", "ijtimoiy-iqtisodiy", "boshqa", "talim", "siyosat", "xorij"];
    if (!allowedCategories.includes(category)) {
      const error = new Error("Bunday kategoriya mavjud emas");
      error.statusCode = 400;
      return next(error);
    }

    const posts = await Post.find({ category }).sort({ date: -1 });

    if (posts.length === 0) {
      const noPostsError = new Error("Bu kategoriyada postlar topilmadi");
      noPostsError.statusCode = 404;
      return next(noPostsError);
    }

    res.json(posts);
  } catch (error) {
    next(error);
  }
};

module.exports = { findCategory };
