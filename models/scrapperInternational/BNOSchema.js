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
    required: [true, 'Please add country name'],
  },
});

module.exports = mongoose.model('BNO', BNOSchema);
