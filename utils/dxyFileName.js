let today = new Date();
let yesterday = new Date(today);
let dayBefore = new Date(today);
yesterday.setDate(yesterday.getDate() - 1);
dayBefore.setDate(dayBefore.getDate() - 2);

exports.getDXYFilename = () => {
  let currentYear = today.getFullYear().toString();
  let yesterdayYear = yesterday.getFullYear().toString();
  let dayBeforeYear = dayBefore.getFullYear().toString();

  let currentMonth = today.getMonth().toString();
  let yesterdayMonth = yesterday.getMonth().toString();
  let dayBeforeMonth = dayBefore.getMonth().toString();
  if (/^\d$/.test(currentMonth)) {
    currentMonth = '0' + currentMonth;
  }
  if (/^\d$/.test(yesterdayMonth)) {
    yesterdayMonth = '0' + yesterdayMonth;
  }
  if (/^\d$/.test(dayBeforeMonth)) {
    dayBeforeMonth = '0' + dayBeforeMonth;
  }
  let currentDay = today.getDate().toString();
  let yesterdayDay = yesterday.getDate().toString();
  let dayBeforeDay = dayBefore.getDate().toString();

  console.log(yesterdayDay);

  if (/^\d$/.test(currentDay)) {
    currentDay = '0' + currentDay;
  }
  if (/^\d$/.test(yesterdayDay)) {
    yesterdayDay = '0' + yesterdayDay;
  }
  if (/^\d$/.test(dayBeforeDay)) {
    dayBeforeDay = '0' + dayBeforeDay;
  }

  let currentFileName = currentYear + currentMonth + currentDay;
  let yesterdayFileName = yesterdayYear + yesterdayMonth + yesterdayDay;
  let dayBeforeFileName = dayBeforeYear + dayBeforeMonth + dayBeforeDay;

  return [currentFileName, yesterdayFileName, dayBeforeFileName];
};
