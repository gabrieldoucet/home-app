const mongoose = require('mongoose');

const summarySchema = new mongoose.Schema({
  id: Number,
  start: Object,
  end: Object,
  films: [mongoose.Schema.Types.ObjectId]
});

module.exports = mongoose.model('Summary', summarySchema);
