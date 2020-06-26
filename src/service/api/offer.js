"use strict";

const express = require(`express`);
const {HttpCode} = require(`../../constants`);
const {offerService} = require(`../data-service`);

const offersRouter = new express.Router();

module.exports = () => {
  offersRouter.get(`/:offerId`, (req, res) => {
    const {offerId} = req.params;
    const offer = offerService.findOne(offerId);

    if (!offer) {
      return res.status(HttpCode.NOT_FOUND)
      .send(`Not found with ${offerId}`);
    }

    return res.status(HttpCode.OK)
        .json(offer);
  });

  offersRouter.post(`/`, offerValidator, (req, res) => {
    const offer = offerService.create(req.body);

    return res.status(HttpCode.CREATED)
      .json(offer);
  });
};

