const dayjs = require("dayjs");

const checkTodaysDate = (date) => {
  const today = dayjs();
  const input = dayjs(date);

  return today.isSame(input);
};

const getTodaysDate = () => {
  return new Date().toISOString.substring(0, 10);
};

const getPreviousMonday = (dateString) => {
  const day = dayjs(dateString);
  return day(-6);
};

module.exports = {
  checkTodaysDate,
  getTodaysDate,
  getPreviousMonday,
};
