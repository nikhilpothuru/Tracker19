const fs = require('fs');
const readline = require('readline');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// Load env vars
dotenv.config({ path: './config/config.env' });

// Connect to DB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

// Load MongoDB Database
const WHOGlobal = require('../models/WHOGlobalSchema');

// Parsing Text File Function (CHANGE TO EXPORT to run in server.js)
exports.whoGlobalStream = async () => {
  const fileStream = fs.createReadStream('./csvFiles/whoGlobalData.txt');

  const rl = readline.createInterface({
    input: fileStream,
    //crlfDelay: Infinity,
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.

  for await (const line of rl) {
    // Each line in input.txt will be successively available here as `line`.
    var arr = line.split(',');
    if (arr[0] !== 'Date') {
      const date_ = arr[0].split('-').join('');
      // Parse Confirmed Cases, Recovered, Deaths, Increase Rate
      const tempList = [];
      for (let i = 1; i <= 4; i++) {
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
      console.log(date_);
      var item = new WHOGlobal({
        date: date_,
        confirmedCases: tempList[0],
        recovered: tempList[1],
        deaths: tempList[2],
        increaseRate: tempList[3],
      });
      item.save((error) => {
        console.log(item);
        if (error) {
          throw error;
        }
      });
    }
  }
};
