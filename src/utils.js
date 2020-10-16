'use strict';

const moment = require(`moment`);

module.exports.randomDate = (start, end) => {
  const unixStart = moment.unix(start) / 1000; // перевели мс в секунды
  const unixEnd = moment.unix(end) / 1000;
  return moment(unixStart + Math.random() * (unixEnd - unixStart));
};

module.exports.getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

module.exports.shuffle = (someArray) => {
  for (let i = someArray.length - 1; i > 0; i--) {
    const randomPosition = Math.floor(Math.random() * i);
    [someArray[i], someArray[randomPosition]] = [someArray[randomPosition], someArray[i]];
  }

  return someArray;
};
