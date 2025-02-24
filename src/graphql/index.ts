import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeResolvers, mergeTypeDefs } from "@graphql-tools/merge";
import { makeExecutableSchema } from "@graphql-tools/schema";
import path from "path";

const typeDefs = mergeTypeDefs(
  loadFilesSync(path.join(__dirname, "schemas/**/*.schema.graphql")),
);

const resolvers = mergeResolvers(
  loadFilesSync(path.join(__dirname, "resolvers/**/*.resolvers.ts")),
);

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export default schema;
