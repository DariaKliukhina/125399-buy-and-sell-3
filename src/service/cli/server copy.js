'use strict';
const chalk = require(`chalk`);

const express = require(`express`);
const {Router} = require(`express`);
const fs = require(`fs`).promises;

const {
  HttpCode,
  FILENAME
} = require(`../../constants`);


const DEFAULT_PORT = 3000;

const app = express();
app.use(express.json());

const offersRouter = new Router();


offersRouter.get(`/`, async (req, res) => {
  try {
    const fileContent = await fs.readFile(FILENAME);
    const mocks = JSON.parse(fileContent);
    res.json(mocks);
  } catch (err) {
    res.json([]);
  }
});

app.use((req, res) => res
.status(HttpCode.NOT_FOUND)
.send(`Not found`));


app.use((req, res) => res
  .status(HttpCode.NOT_FOUND)
  .send(`Not found`));


module.exports = {
  name: `--server`,
  async run(args) {

    const [customPort] = args;
    const port = Number.parseInt(customPort, 10) || DEFAULT_PORT;
    app.listen(port, (err) => {
      if (err) {
        return console.error(`Ошибка при создании сервера`, err);
      }
      return console.info(chalk.green(`Ожидаю соединений на ${port}`));
    });
  }
};


