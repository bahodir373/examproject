const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  birthDate: { type: Date, required: true },
  birthPlace: { type: String, required: true },
  education: { type: String, required: true },
  achievements: { type: [String], default: [] },
  website: { type: String },
  photo: { type: String }
});

module.exports = mongoose.model('Author', authorSchema);
