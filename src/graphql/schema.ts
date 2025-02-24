export const typeDefs = `#graphql
  type Game {
    id: ID!
    name: String!
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    games: [Game!]!
  }
`;

export const resolvers = {
  Query: {
    games: () => {
      return [
        {
          id: "1",
          name: "Super Mario World",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: "2",
          name: "Sonic the Hedgehog",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ];
    },
  },
};
