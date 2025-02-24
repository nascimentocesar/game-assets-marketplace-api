const gameResolvers = {
  Query: {
    games: () => {
      return [];
    },
    game: (id: string) => {
      return { id: "100" };
    },
  },
};

export default gameResolvers;
