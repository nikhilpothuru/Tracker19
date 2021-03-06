const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');

// Load env vars
dotenv.config({ path: './config/config.env' });

// Load Global Model
const WHOGlobal = require('./models/WHOGlobalSchema');
// Load International Models
const BNO = require('./models/scrapperInternational/BNOSchema');
// Load USA Models
const BNOState = require('./models/scrapperUSA/BNOStateSchema');
const WorldOMeter = require('./models/scrapperUSA/WorldOMeterSchema');

// Connect to DB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

// Delete Data
const deleteData = async () => {
  try {
    await WHOGlobal.deleteMany();
    await BNO.deleteMany();
    await BNOState.deleteMany();
    await WorldOMeter.deleteMany();
    console.log('Data Destroyed...'.red.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

if (process.argv[2] === '-d') {
  deleteData();
}
