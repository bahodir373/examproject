const Post = require('../models/Post');
const Tag = require('../models/Tag');

const getAllTags = async (req, res, next) => {
  try {
    const tags = await Tag.find();
    res.json(tags);
  } catch (error) {
    next(error);
  }
};

const getPostsByTag = async (req, res, next) => {
  try {
    const tagId = parseInt(req.params.id);

    if (isNaN(tagId)) {
      const err = new Error("Tag ID noto'g'ri formatda");
      err.statusCode = 400;
      return next(err);
    }

    const posts = await Post.find({ tags: tagId });

    if (posts.length === 0) {
      const err = new Error("Bu tagga mos postlar topilmadi");
      err.statusCode = 404;
      return next(err);
    }

    res.json(posts);
  } catch (error) {
    next(error);
  }
};

const createTag = async (req, res, next) => {
  try {
    const { name } = req.body;

    if (!name) {
      const err = new Error("Tag nomi majburiy");
      err.statusCode = 400;
      return next(err);
    }

    const existingTag = await Tag.findOne({ name });
    if (existingTag) {
      const err = new Error("Bu nomli tag allaqachon mavjud");
      err.statusCode = 409;
      return next(err);
    }

    const lastTag = await Tag.findOne().sort({ id: -1 });
    const newId = lastTag ? lastTag.id + 1 : 1;

    const newTag = new Tag({ id: newId, name });
    await newTag.save();

    res.status(201).json({ message: "Tag yaratildi", tag: newTag });
  } catch (error) {
    next(error);
  }
};

const updateTag = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    if (!name) {
      const err = new Error("Tag nomini kiritish majburiy");
      err.statusCode = 400;
      return next(err);
    }

    const existingTag = await Tag.findOne({ name });
    if (existingTag && existingTag.id !== parseInt(id)) {
      const err = new Error("Bu nomli tag allaqachon mavjud");
      err.statusCode = 409;
      return next(err);
    }

    const updatedTag = await Tag.findOneAndUpdate(
      { id: parseInt(id) },
      { name },
      { new: true, runValidators: true }
    );

    if (!updatedTag) {
      const err = new Error("Tag topilmadi");
      err.statusCode = 404;
      return next(err);
    }

    res.status(200).json({ message: "Tag yangilandi", tag: updatedTag });
  } catch (error) {
    next(error);
  }
};

const deleteTag = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deletedTag = await Tag.findOneAndDelete({ id: parseInt(id) });

    if (!deletedTag) {
      const err = new Error("Tag topilmadi");
      err.statusCode = 404;
      return next(err);
    }

    res.status(200).json({ message: "Tag o'chirildi", tag: deletedTag });
  } catch (error) {
    next(error);
  }
};


module.exports = { getAllTags, getPostsByTag, createTag, updateTag, deleteTag };
