const mongoose = require("mongoose");

const TagSchema = new mongoose.Schema({
  id: { type: Number, unique: true, required: true },
  name: { type: String, required: true }
});

const Tag = mongoose.model("Tag", TagSchema);
module.exports = Tag;
