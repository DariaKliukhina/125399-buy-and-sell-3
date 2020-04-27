'use strict';
const chalk = require(`chalk`);
const {
  getRandomInt,
  shuffle,
  printNumWithLead0
} = require(`../../utils`);
const fs = require(`fs`).promises;
const FILE_SENTENCES_PATH = `./data/sentences.txt`;
const FILE_TITLES_PATH = `./data/titles.txt`;
const FILE_CATEGORIES_PATH = `./data/categories.txt`;

const DEFAULT_COUNT = 1;
const FILE_NAME = `mocks.json`;

const OfferType = {
  offer: `offer`,
  sale: `sale`,
};


const PictureRestrict = {
  min: 1,
  max: 16,
};

const SumRestrict = {
  min: 1000,
  max: 100000,
};

const readContent = async (filePath) => {
  try {
    const content = await fs.readFile(filePath, `utf8`);
    return content.split(`\n`);
  } catch (err) {
    console.error(chalk.red(err));
    throw err;
  }
};

const getPictureFileName = (number) => `item${printNumWithLead0(number)}.jpg`;
const generatePicture = () => getPictureFileName(getRandomInt(PictureRestrict.min, PictureRestrict.max));

const generateCategory = (categories) => categories[getRandomInt(0, categories.length - 1)];
const generateDescription = (sentences) => shuffle(sentences).slice(1, 5).join(` `);
const generateTitle = (titles) => titles[getRandomInt(0, titles.length - 1)];
const generateType = () => Object.keys(OfferType)[Math.floor(Math.random() * Object.keys(OfferType).length)];

const generateOffers = (count, titles, categories, sentences) => {
  let offersArray = [];

  for (let i = 0; i < count; i++) {
    offersArray.push({
      category: [generateCategory(categories)],
      description: generateDescription(sentences),
      picture: generatePicture(),
      title: generateTitle(titles),
      type: generateType(),
      sum: getRandomInt(SumRestrict.min, SumRestrict.max),
    });
  }

  return offersArray;
};

module.exports = {
  name: `--generate`,
  async run(args) {

    try {
      const [count] = args;
      const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT;

      const readSentences = readContent(FILE_SENTENCES_PATH);
      const readTitles = readContent(FILE_TITLES_PATH);
      const readCategories = readContent(FILE_CATEGORIES_PATH);

      const [sentences, titles, categories] = await Promise
        .all([
          readSentences,
          readTitles,
          readCategories
        ]);

      const offers = generateOffers(countOffer, titles, categories, sentences);
      const content = JSON.stringify(offers);

      await fs.writeFile(FILE_NAME, content);
      console.log(chalk.green(`Operation success. File created.`));
    } catch (err) {
      console.error(chalk.red(`Can't write data to file. ${err}`));
    }
  }
};


