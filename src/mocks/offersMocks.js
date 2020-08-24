'use strict';

const CATEGORIES = [`category-1`, `category-2`, `category-3`, `category-4`, `category-5`];
const OFFER_TYPES = [`offer`, `sale`];

const offersMocks = [
  {
    "id": `offerId-1`,
    "comments": [
      {
        "id": `commentId-1`,
        "text": `comment-text-1`
      },
      {
        "id": `commentId-2`,
        "text": `comment-text-2`
      },
    ],
    "title": `title-1`,
    "picture": `picture-1`,
    "description": `description-1`,
    "type": OFFER_TYPES[1],
    "sum": 100,
    "category": [
      CATEGORIES[0],
      CATEGORIES[1],
      CATEGORIES[2]
    ]
  },
  {
    "id": `offerId-2`,
    "comments": [],
    "title": `title-2`,
    "picture": `picture-2`,
    "description": `description-2`,
    "type": OFFER_TYPES[1],
    "sum": 200,
    "category": [
      CATEGORIES[2],
      CATEGORIES[3],
      CATEGORIES[4]
    ]
  },
  {
    "id": `offerId-3`,
    "comments": [
      {
        "id": `commentId-3`,
        "text": `comment-text-3`
      }
    ],
    "title": `title-3`,
    "picture": `picture-3`,
    "description": `description-3`,
    "type": OFFER_TYPES[1],
    "sum": 300,
    "category": [
      CATEGORIES[4],
    ]
  },
];

module.exports = offersMocks;
