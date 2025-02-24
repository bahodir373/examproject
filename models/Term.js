const mongoose = require('mongoose');

const termSchema = new mongoose.Schema({
  term: { type: String, required: true },
  description: { type: String, required: true }
});

module.exports = mongoose.model('Term', termSchema);
