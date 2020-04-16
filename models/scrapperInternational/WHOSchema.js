const mongoose = require('mongoose');

const WHOSchema = new mongoose.Schema({
  date: {
    type: String,
  },
  countryName: {
    type: String,
  },
  confirmedCases: {
    type: Number,
  },
  deaths: {
    type: Number,
  },
  recovered: {
    type: Number,
  },
});

module.exports = mongoose.model('WHO', WHOSchema);
