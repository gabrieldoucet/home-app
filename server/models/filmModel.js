const mongoose = require('mongoose');

const filmSchema = new mongoose.Schema({
  date: String,
  title: String,
  location: String,
  unlimited: Boolean
});

module.exports = mongoose.model('Film', filmSchema);
