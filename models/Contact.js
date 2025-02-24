const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, enum: ['Taklif', 'Tanqid', 'Shikoyat'], required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
},{versionKey: false});

module.exports = mongoose.model('Contact', contactSchema);
