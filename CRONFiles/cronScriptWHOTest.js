let LineByLineReader = require('line-by-line');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const colors = require('colors');

// Load env vars
dotenv.config({ path: './config/config.env' });

// Connect to DB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

// Load MongoDB Model
const WHO = require('../models/scrapperInternational/WHOSchema');

// Line parser
lr = new LineByLineReader('./csvFiles/internationalData/whoData.txt');

// Function to update all the data
let updateAllData = () => {
  lr.on('line', (line) => {
    console.log('Entered update');
    var arr = line.split(',');
    const date_ = arr[0].split('-').join('');
    if (!arr[2] && date_ === currentDate) {
      const country_name = arr[1]
        .replace(/(\r\n|\n|\r|\s)/gm, '')
        .toLowerCase();
      // Parse Confirmed Cases, New Cases, Deaths, New Deaths, Active Cases
      const tempList = [];
      for (let i = 5; i <= 7; i++) {
        let temp = parseInt(
          arr[i]
            .replace(/(\r\n|\n|\r)/gm, '')
            .split(',')
            .join('')
        );
        if (Number.isNaN(temp)) {
          temp = 0;
        }
        tempList.push(temp);
      }
      //console.log(date_);
      var item = new WHO({
        date: date_,
        countryName: country_name,
        confirmedCases: tempList[0],
        deaths: tempList[1],
        recovered: tempList[2],
      });
      item.save((error) => {
        console.log(item);
        if (error) {
          throw error;
        }
      });
    }
  });
};
// Function to rewrite all the data
let rewriteAllData = async () => {
  lr.on('line', (line) => {
    //try {
    var arr = line.split(',');
    if (!arr[2]) {
      const date_ = arr[0].split('-').join('');
      const country_name = arr[1]
        .replace(/(\r\n|\n|\r|\s)/gm, '')
        .toLowerCase();
      // Parse Confirmed Cases, New Cases, Deaths, New Deaths, Active Cases
      const tempList = [];
      for (let i = 5; i <= 7; i++) {
        let temp = parseInt(
          arr[i]
            .replace(/(\r\n|\n|\r)/gm, '')
            .split(',')
            .join('')
        );
        if (Number.isNaN(temp)) {
          temp = 0;
        }
        tempList.push(temp);
      }
      //console.log(date_);
      var item = new WHO({
        date: date_,
        countryName: country_name,
        confirmedCases: tempList[0],
        deaths: tempList[1],
        recovered: tempList[2],
      });
      item.save((error) => {
        console.log(item);
        if (error) {
          throw error;
        }
      });
    }
    /*} catch (err) {
      console.log(err);
    }*/
  });
};

//-----------------------------------------------------------
// Set today and yesterday data
let today = new Date();
let yesterday = new Date(today);
yesterday.setDate(yesterday.getDate() - 1);
let currentYear = today.getFullYear().toString();
let yesterdayYear = yesterday.getFullYear().toString();
let currentMonth = (today.getMonth() + 1).toString();
let yesterdayMonth = (yesterday.getMonth() + 1).toString();
let currentDay = today.getDate().toString();
let yesterdayDay = yesterday.getDate().toString();
if (/^\d$/.test(currentMonth)) {
  currentMonth = '0' + currentMonth;
}
if (/^\d$/.test(yesterdayMonth)) {
  yesterdayMonth = '0' + yesterdayMonth;
}
if (/^\d$/.test(currentDay)) {
  currentDay = '0' + currentDay;
}
if (/^\d$/.test(yesterdayDay)) {
  yesterdayDay = '0' + yesterdayDay;
}
let currentDate = currentYear + currentMonth + currentDay;
let yesterdayDate = yesterdayYear + yesterdayMonth + yesterdayDay;
//-----------------------------------------------------------

//-----------------------------------------------------------
// Check if Objects with today and yesterday's dates are in
let currentDayExist = 0;
let yesterdayExist = 0;

let check = async () => {
  //console.log('Inside check');
  try {
    currentDayExist = await WHO.countDocuments(
      { date: currentDate },
      (err, count) => {
        if (count > 0) {
          currentDayExist = true;
        }
      }
    );

    yesterdayExist = await WHO.countDocuments(
      { date: yesterdayDate },
      (err, count) => {
        if (count > 0) {
          yesterdayExist = true;
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};

//-----------------------------------------------------------
/* 
    Function to handle MongoDB chnages
    Several Cases:
        - Current Day Exists
            - DB is up to date
        - Current Day Doesn't Exit
            - Yesterday Exists
                - Run scrapper
                - Check if today's dates are in
                - if they are in: update the database
                - if they aren't: DB is up to date
            - Yesterday Doesn't Exist
                - Run rewriteAllData()
*/

const whoStream = async () => {
  await check();
  //console.log(currentDate + ' ' + currentDayExist);
  //console.log(yesterdayDate + ' ' + yesterdayExist);
  if (currentDayExist === 0) {
    if (yesterdayExist !== 0) {
      updateAllData();
      console.log(
        'Current Day Not In, But Yesterday In, Ran an update'.yellow.bold
      );
    } else {
      await rewriteAllData();
      console.log(
        'Current Day Not In, And Yesterday Not In, Rewrote everything'.red.bold
      );
    }
  } else {
    console.log('Up to date, No change necessary'.green.bold);
  }
};

whoStream();
