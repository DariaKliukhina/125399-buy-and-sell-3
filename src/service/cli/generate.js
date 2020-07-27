'use strict';
const chalk = require(`chalk`);
const {nanoid} = require(`nanoid`);
const {
  getRandomInt,
  shuffle,
  printNumWithLead0
} = require(`../../utils`);
const fs = require(`fs`).promises;
const FILE_SENTENCES_PATH = `./data/sentences.txt`;
const FILE_TITLES_PATH = `./data/titles.txt`;
const FILE_CATEGORIES_PATH = `./data/categories.txt`;
const FILE_COMMENTS_PATH = `./data/comments.txt`;


const {
  MAX_ID_LENGTH,
  FILENAME
} = require(`../../constants`);

const DEFAULT_COUNT = 1;
const MAX_COMMENTS = 4;

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
const generateComments = (count, comments) =>(
  Array(count).fill({}).map(() => ({
    id: nanoid(MAX_ID_LENGTH),
    text: shuffle(comments)
      .slice(0, getRandomInt(1, 3))
      .join(` `),
  }))
);

const generateOffers = (count, titles, categories, sentences, comments) => {
  let offersArray = [];

  for (let i = 0; i < count; i++) {
    offersArray.push({
      id: nanoid(MAX_ID_LENGTH),
      category: [generateCategory(categories)],
      description: generateDescription(sentences),
      picture: generatePicture(),
      title: generateTitle(titles),
      type: generateType(),
      sum: getRandomInt(SumRestrict.min, SumRestrict.max),
      comments: generateComments(getRandomInt(1, MAX_COMMENTS), comments),
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
      const readComments = readContent(FILE_COMMENTS_PATH);

      const [sentences, titles, categories, comments] = await Promise
        .all([
          readSentences,
          readTitles,
          readCategories,
          readComments
        ]);

      const offers = generateOffers(countOffer, titles, categories, sentences, comments);
      const content = JSON.stringify(offers);

      await fs.writeFile(FILENAME, content);
      console.log(chalk.green(`Operation success. File created.`));
    } catch (err) {
      console.error(chalk.red(`Can't write data to file. ${err}`));
    }
  }
};


