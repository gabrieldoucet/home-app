const mongoose = require('mongoose');

const scoreSchema = new mongoose.Schema({
  email: String
});

module.exports = mongoose.model('Score', scoreSchema);
