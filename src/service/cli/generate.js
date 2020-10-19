'use strict';

const fs = require(`fs`).promises;
const moment = require(`moment`);
const chalk = require(`chalk`);

const {randomDate, getRandomInt, shuffle} = require(`../../utils`);

const FILE_NAME = `mocks.json`;
const DEFAULT_POSTS_COUNT = 1;
const MAX_POSTS_COUNT = 1000;

const FILE_TITLES_PATH = `./data/titles.txt`;
const FILE_CATEGORIES_PATH = `./data/categories.txt`;
const FILE_SENTENCES_PATH = `./data/sentences.txt`;

const MAX_MONTHS_GAP = 3;

const readContent = async (filePath) => {
  try {
    const content = await fs.readFile(filePath, `utf8`);
    return content.split(`\n`);
  } catch (err) {
    console.error(chalk.red(err));
    return [];
  }
};

const generateOffers = (count, titles, categories, sentences) => {
  const ago = moment().subtract(MAX_MONTHS_GAP, `months`);
  const randomAnnounceLength = getRandomInt(1, 5);
  return Array(count).fill({}).map(() => ({
    title: titles[getRandomInt(0, titles.length - 1)],
    createdDate: randomDate(ago, moment()),
    announce: shuffle(sentences).slice(randomAnnounceLength).join(` `),
    fullText: shuffle(sentences).slice(randomAnnounceLength, sentences.length - 1).join(` `),
    category: Array(3).fill([]).map(() => categories[getRandomInt(0, categories.length - 1)])
  }));
};

module.exports = {
  name: `--generate`,
  async run(args) {
    const titles = await readContent(FILE_TITLES_PATH);
    const categories = await readContent(FILE_CATEGORIES_PATH);
    const sentences = await readContent(FILE_SENTENCES_PATH);

    const [count] = args;
    const offersCount = Number.parseInt(count, 10) || DEFAULT_POSTS_COUNT;

    if (offersCount > MAX_POSTS_COUNT) {
      console.error(chalk.red(`Не больше ${MAX_POSTS_COUNT} публикаций`));
      process.exit(1);
    }

    const content = JSON.stringify(generateOffers(offersCount, titles, categories, sentences));

    try {
      await fs.writeFile(FILE_NAME, content);
      console.info(chalk.green(`Operation success. File created.`));
    } catch (err) {
      console.error(chalk.red(`Can't write data to file...`));
    }
  }
};

