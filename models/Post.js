const mongoose = require("mongoose");
const slugify = require("slugify");

const PostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, unique: true },
  date: { type: Date, default: Date.now },
  views: { type: Number, default: 0 },
  category: { type: String, required: true },
  image: { type: String, required: false },
  content: { type: String, required: true },
  tags: [{ type: Number }],
  highlighted: { type: Boolean, default: false }
});

PostSchema.pre("save", function (next) {
  this.slug = slugify(this.title, { lower: true, strict: true });
  next();
});

const Post = mongoose.model("Post", PostSchema);
module.exports = Post;
