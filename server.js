const cron = require('node-cron');
const shell = require('shelljs');
const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const connectDB = require('./config/db');
const {
  bnoStream,
  bnoStateStream,
  worldometerStream,
} = require('./cronScript');

// Load environment variables
dotenv.config({ path: './config/config.env' });

// Connect to database
connectDB();

// CRON - Time Based Scheduler that will run seeder.js
// https://www.youtube.com/watch?v=FfBBeUa-uI0&t=2s
cron.schedule('0 * * * * *', () => {
  if (shell.exec('node seeder -d').code !== 0) {
    console.log("Couldn't delete data");
  }
  bnoStream();
  bnoStateStream();
  worldometerStream();
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
