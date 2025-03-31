import { faker } from "@faker-js/faker";

export const factoryAsset = () => ({
  createdAt: faker.date.past(),
  expiresAt: faker.date.future(),
  externalId: faker.string.uuid(),
  gameId: faker.string.uuid(),
  id: faker.string.uuid(),
  metadata: {
    [faker.string.alphanumeric()]: faker.string.alphanumeric(),
  },
  startsAt: faker.date.future(),
  updatedAt: faker.date.past(),
});

export const factoryGame = () => ({
  createdAt: faker.date.past(),
  id: faker.string.uuid(),
  name: faker.string.alpha(),
  updatedAt: faker.date.past(),
});

export const factoryProduct = () => ({
  assetId: faker.string.uuid(),
  createdAt: faker.date.past(),
  id: faker.string.uuid(),
  price: parseFloat(faker.commerce.price()),
  title: faker.string.alpha(),
  updatedAt: faker.date.past(),
});
