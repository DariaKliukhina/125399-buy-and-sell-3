'use strict';

const request = require(`supertest`);
const {createApp} = require(`../cli/server`);
const offersMocks = require(`../../mocks/offersMocks`);

describe(`Categories`, () => {
  test(`categories test`, async () => {
    const server = await createApp(offersMocks);
    const res = await request(server).get(`/api/categories`);

    expect(res.statusCode).toBe(200);
  });
});
