const Post = require("../models/Post");
const path = require("path");
const Tag = require('../models/Tag');

exports.getInitialPosts = async (req, res, next) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 }).limit(5);
    const totalPosts = await Post.countDocuments();

    res.json({
      posts,
      hasMore: posts.length < totalPosts
    });
  } catch (error) {
    next(error);
  }
};


exports.getPostBySlug = async (req, res, next) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug });

    if (!post) {
      const err = new Error("Bunday post topilmadi");
      err.statusCode = 404;
      return next(err);
    }

    post.views += 1;
    await post.save();

    res.json(post);
  } catch (error) {
    next(error);
  }
};


exports.createPost = async (req, res, next) => {
  try {
    const { title, category, content, highlighted } = req.body;

    let tags = req.body.tags;
    if (!Array.isArray(tags)) {
      tags = tags ? tags.split(",").map(tag => tag.trim()) : [];
    }

    let imagePath = "";

    if (req.file) {
      imagePath = `/uploads/${req.file.filename}`;
    } else {
      const err = new Error("Rasm yuklanmagan");
      err.statusCode = 400;
      return next(err);
    }

    const tagDocs = await Tag.find({ name: { $in: tags } });
    const tagIds = tagDocs.map(tag => tag.id);

    if (tagIds.length !== tags.length) {
      const err = new Error("Ba'zi taglar topilmadi");
      err.statusCode = 400;
      return next(err);
    }

    const newPost = new Post({
      title,
      category,
      content,
      image: imagePath,
      tags: tagIds,
      highlighted
    });

    await newPost.save();

    res.status(201).json({ message: "Post muvaffaqiyatli yaratildi", post: newPost });
  } catch (error) {
    next(error);
  }
};




exports.updatePost = async (req, res, next) => {
  try {
    const { title, category, content, highlighted } = req.body;
    let tags = req.body.tags;

    if (!Array.isArray(tags)) {
      tags = tags ? tags.split(",").map(tag => tag.trim()) : [];
    }

    let imagePath = "";
    if (req.file) {
      imagePath = `/uploads/${req.file.filename}`;
    }

    const post = await Post.findOne({ slug: req.params.slug });
    if (!post) {
      return res.status(404).json({ message: "Post topilmadi" });
    }

    const tagDocs = await Tag.find({ name: { $in: tags } });
    const tagIds = tagDocs.map(tag => tag.id);

    if (tagIds.length !== tags.length) {
      const err = new Error("Ba'zi taglar topilmadi");
      err.statusCode = 400;
      return next(err);
    }

    post.title = title || post.title;
    post.category = category || post.category;
    post.content = content || post.content;
    post.tags = tags.length ? tags : post.tags;
    post.highlighted = highlighted ?? post.highlighted;
    if (imagePath) post.image = imagePath;

    await post.save();
    res.status(200).json({ message: "Post yangilandi", post });
  } catch (error) {
    next(error);
  }
}



exports.deletePost = async (req, res, next) => {
  try {
    const { slug } = req.params;

    const post = await Post.findOneAndDelete({ slug });
    if (!post) {
      const err = new Error("Bunday post topilmadi");
      err.statusCode = 404;
      return next(err);
    }

    res.json({ message: "Post o‘chirildi" });
  } catch (error) {
    next(error);
  }
};



exports.getDolzarbPosts = async (req, res, next) => {
  try {
    const dolzarbPosts = await Post.find({ highlighted: true }).sort({ date: -1 });
    res.json(dolzarbPosts);
  } catch (error) {
    next(error);
  }
};

exports.loadMorePosts = async (req, res, next) => {
  try {
    const skip = parseInt(req.query.skip) || 0;
    const limit = 10;

    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalPosts = await Post.countDocuments();

    res.json({
      posts,
      hasMore: skip + limit < totalPosts
    });
  } catch (error) {
    next(error);
  }
};




exports.searchFunc = async (req, res, next) => {
  try {
    const { query } = req.query;

    if (!query) {
      const err = new Error("Qidiruv uchun matn kiriting");
      err.statusCode = 400;
      return next(err);
    }

    const regex = new RegExp(query, 'i');
    const posts = await Post.find({ title: { $regex: regex } });

    if (posts.length === 0) {
      const err = new Error("Mos postlar topilmadi");
      err.statusCode = 404;
      return next(err);
    }

    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};
