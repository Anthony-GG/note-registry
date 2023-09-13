// Immediately export a function that generates a string of random numbers and letters as a background id, taken from activity 17
module.exports = () =>
  Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
