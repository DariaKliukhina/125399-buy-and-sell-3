'use strict';
const chalk = require(`chalk`);
const {
  getRandomInt,
  shuffle,
  printNumWithLead0
} = require(`../../utils`);
const fs = require(`fs`).promises;

const DEFAULT_COUNT = 1;
const FILE_NAME = `mocks.json`;

const TITLES = [
  `Продам книги Стивена Кинга`,
  `Продам новую приставку Sony Playstation 5`,
  `Продам отличную подборку фильмов на VHS`,
  `Куплю антиквариат`,
  `Куплю породистого кота`,
];

const SENTENCES = [
  `Товар в отличном состоянии.`,
  `Пользовались бережно и только по большим праздникам.`,
  `Продаю с болью в сердце...`,
  `Бонусом отдам все аксессуары.`,
  `Даю недельную гарантию.`,
  `Если товар не понравится — верну всё до последней копейки.`,
  `Это настоящая находка для коллекционера!`,
  `Если найдёте дешевле — сброшу цену.`,
  `Таких предложений больше нет!`,
  `При покупке с меня бесплатная доставка в черте города.`,
];

const CATEGORIES = [
  `Книги`,
  `Разное`,
  `Посуда`,
  `Игры`,
  `Животные`,
  `Журналы`,
];

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

const getPictureFileName = (number) => `item${printNumWithLead0(number)}.jpg`;
const generatePicture = () => getPictureFileName(getRandomInt(PictureRestrict.min, PictureRestrict.max));

const generateCategory = () => CATEGORIES[getRandomInt(0, CATEGORIES.length - 1)];
const generateDescription = () => shuffle(SENTENCES).slice(1, 5).join(` `);
const generateTitle = () => TITLES[getRandomInt(0, TITLES.length - 1)];
const generateType = () => Object.keys(OfferType)[Math.floor(Math.random() * Object.keys(OfferType).length)];

const generateOffers = (count) => {
  let offersArray = [];

  for (let i = 0; i < count; i++) {
    offersArray.push({
      category: [generateCategory()],
      description: generateDescription(),
      picture: generatePicture(),
      title: generateTitle(),
      type: generateType(),
      sum: getRandomInt(SumRestrict.min, SumRestrict.max),
    });
  }

  return offersArray;
};

module.exports = {
  name: `--generate`,
  async run(args) {
    const [count] = args;
    const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT;
    const offers = generateOffers(countOffer);
    const content = JSON.stringify(offers);

    try {
      await fs.writeFile(FILE_NAME, content);
      console.log(chalk.green(`Operation success. File created.`));
    } catch (err) {
      console.error(chalk.red(`Can't write data to file...`));
    }
  }
};
