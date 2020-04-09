const mongoose = require('mongoose');

const WorldOMeterSchema = new mongoose.Schema({
  stateName: {
    type: String,
    required: [true, 'Please add state name'],
    unique: true,
  },
  confirmedCases: {
    type: Number,
  },
  newCases: {
    type: Number,
  },
  deaths: {
    type: Number,
  },
  newDeaths: {
    type: Number,
  },
  activeCases: {
    type: Number,
  },
});

module.exports = mongoose.model('WorldOMeter', WorldOMeterSchema);
