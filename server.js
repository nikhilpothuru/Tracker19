const cron = require('node-cron');
const shell = require('shelljs');

// https://www.youtube.com/watch?v=FfBBeUa-uI0&t=2s
cron.schedule('0 * * * * *', () => {
  if (
    shell.exec('python3 ./dataScrapping/usaScrapper/bnoScrapperState.py')
      .code !== 0
  ) {
    console.log('something went wrong');
  }
});
