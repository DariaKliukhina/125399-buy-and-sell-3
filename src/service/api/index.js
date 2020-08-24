'use strict';

const {Router} = require(`express`);
const category = require(`../api/category`);
const offer = require(`../api/offer`);
const search = require(`../api/search`);

const {
  CategoryService,
  SearchService,
  OfferService,
  CommentService,
} = require(`../data-service`);

const createApi = async (data) => {
  const app = new Router();

  category(app, new CategoryService(data));
  search(app, new SearchService(data));
  offer(app, new OfferService(data), new CommentService());

  return app;
};

module.exports = createApi;
