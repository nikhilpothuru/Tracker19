const fs = require('fs');
const csv = require('fast-csv');
const shell = require('shelljs');
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');

// Load env vars
dotenv.config({ path: './config/config.env' });

// Connect to DB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

// Load Mongoose Schema
const WorldOMeter = require('../models/scrapperUSA/WorldOMeterSchema');

// Load World O Meter Data to MongoDB
exports.worldometerStream = () => {
  fs.createReadStream('./csvFiles/stateData/worldometer.csv')
    .pipe(csv.parse())
    .on('data', (row) => {
      // State Name
      const state_name = row[0].replace(/(\r\n|\n|\r|\s)/gm, '').toLowerCase();

      // Parse Confirmed Cases, New Cases, Deaths, New Deaths, Active Cases
      const tempList = [];
      for (let i = 1; i <= 5; i++) {
        let temp = parseInt(
          row[i]
            .replace(/(\r\n|\n|\r)/gm, '')
            .split(',')
            .join('')
        );
        if (Number.isNaN(temp)) {
          temp = 0;
        }
        tempList.push(temp);
      }

      var item = new WorldOMeter({
        stateName: state_name,
        confirmedCases: tempList[0],
        newCases: tempList[1],
        deaths: tempList[2],
        newDeaths: tempList[3],
        activeCases: tempList[4],
      });
      item.save((error) => {
        console.log(item);
        if (error) {
          throw error;
        }
      });
    })
    .on('end', (rowCount) => {
      console.log(`Parsed ${rowCount} rows`);
    })
    .on('error', (error) => console.error(error));
};
