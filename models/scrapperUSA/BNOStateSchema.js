const mongoose = require('mongoose');

const BNOStateSchema = new mongoose.Schema({
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
  seriousCritical: {
    type: Number,
  },
  recovered: {
    type: Number,
  },
});

module.exports = mongoose.model('BNOState', BNOStateSchema);
