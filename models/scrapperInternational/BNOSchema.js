// NOT FINISHED
const mongoose = require('mongoose');

const BNOSchema = new mongoose.Schema({
  countryName: {
    type: String,
    required: [true, 'Please add country name'],
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

module.exports = mongoose.model('BNO', BNOSchema);
