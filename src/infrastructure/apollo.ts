import http from "http";
import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { schema, schemaWithMocks } from "./graphql";

export const createApolloServer = (
  httpServer: http.Server<
    typeof http.IncomingMessage,
    typeof http.ServerResponse
  >,
): ApolloServer => {
  return new ApolloServer({
    schema:
      process.env.APOLLO_SERVER_ENABLE_MOCKS === "true"
        ? schemaWithMocks
        : schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
};
