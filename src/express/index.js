'use strict';

const express = require(`express`);
const path = require(`path`);

const DEFAULT_PORT = 8080;

const app = express();

const PUBLIC_DIR = `public`;
app.use(express.static(path.resolve(__dirname, PUBLIC_DIR)));

app.set(`views`, path.resolve(__dirname, `templates`));
app.set(`view engine`, `pug`);

const offersRoutes = require(`./routes/offers.routes`);
const myRoutes = require(`./routes/my.routes`);
const mainRoutes = require(`./routes/main.routes`);


app.use(`/offers`, offersRoutes);
app.use(`/my`, myRoutes);
app.use(`/`, mainRoutes);

app.listen(DEFAULT_PORT);
