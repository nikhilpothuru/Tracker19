const cron = require('node-cron');
const shell = require('shelljs');
const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const connectDB = require('./config/db');
const { bnoStream, bnoStateStream } = require('./CRONFiles/cronScriptBNO');
const { worldometerStream } = require('./CRONFiles/cronScriptWorldOMeter');
const { whoStream } = require('./CRONFiles/test');
const { whoGlobalStream } = require('./CRONFiles/cronScriptWHOGlobal');

// Load environment variables
dotenv.config({ path: './config/config.env' });

// Connect to database
connectDB();

// CRON - Time Based Scheduler that will run seeder.js
cron.schedule('0 0 12 * * *', () => {
  if (shell.exec('node seeder -d').code !== 0) {
    console.log("Couldn't delete data");
  }
  // WHO Global Scrapper
  if (shell.exec('python3 ./dataScrapping/whoGlobalScrapper.py').code !== 0) {
    console.log("Couldn't load WHO Global Data");
  }
  // WHO International Scrapper
  if (
    shell.exec('python3 ./dataScrapping/internationalScrapper/whoScrapper.py')
      .code !== 0
  ) {
    console.log("Couldn't load WHO Data");
  }
  // BNO International Scrapper
  if (
    shell.exec('python3 ./dataScrapping/internationalScrapper/bnoScrapper.py')
      .code !== 0
  ) {
    console.log("Couldn't load BNO Data");
  }
  // BNO USA Scrapper
  if (
    shell.exec('python3 ./dataScrapping/usaScrapper/bnoScrapperState.py')
      .code !== 0
  ) {
    console.log("Couldn't load BNO USA Data");
  }
  // WorldOMeter State
  if (
    shell.exec('python3 ./dataScrapping/usaScrapper/worldometer.py').code !== 0
  ) {
    console.log("Couldn't load WorldOMeter State Data");
  }
  whoGlobalStream();
  bnoStream();
  bnoStateStream();
  worldometerStream();
  whoStream();
  console.log('Successfully loaded new data to MongoDB');
});

// Load express
const app = express();

// Set PORT
const PORT = process.env.PORT || 5000;

// Listen to app
const server = app.listen(PORT, () => {
  console.log(
    `Server running in env ${process.env.NODE_ENV} mode on port ${PORT}`.blue
      .bold.underline
  );
});

// Handle unhandled rejections if MongoDB doesn't connect from db.js
// Note* connectDB() returns a promise, but we aren't using a try-catch
process.on('unhandled rejection', (err, promise) => {
  console.log(`Error: ${err.message}.red.underline.bold`);
  // Close server and exit process
  server.close(() => {
    process.exit(1);
  });
});
