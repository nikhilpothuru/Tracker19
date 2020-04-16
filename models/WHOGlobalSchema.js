const mongoose = require('mongoose');

const WHOGlobalSchema = new mongoose.Schema({
  date: {
    type: String,
  },
  confirmedCases: {
    type: Number,
  },
  recovered: {
    type: Number,
  },
  deaths: {
    type: Number,
  },
  increaseRate: {
    type: Number,
  },
});

module.exports = mongoose.model('WHOGlobal', WHOGlobalSchema);
