"use strict";

const express = require(`express`);

const category = require(`./category`);
const offers = require(`./offers`);
const search = require(`./search`);

const getMockData = require(`../lib/getMockData`);

const {
  CategoryService,
  OfferService,
  CommentService,
  SearchService,
} = require(`../data-service`);

const createApi = async () => {
  const apiRouter = new express.Router();
  const mockData = await getMockData();

  category(apiRouter, new CategoryService(mockData));
  offers(apiRouter, new OfferService(mockData), new CommentService());
  search(apiRouter, new SearchService(mockData));

  return apiRouter;
};

module.exports = createApi;
