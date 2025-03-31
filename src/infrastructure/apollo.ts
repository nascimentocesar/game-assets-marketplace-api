import http from "http";
import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { schema } from "./graphql";
import { prismaClient } from "./prisma";
import { startStandaloneServer } from "@apollo/server/standalone";

export const createApolloServer = (
  httpServer: http.Server<
    typeof http.IncomingMessage,
    typeof http.ServerResponse
  >,
): ApolloServer => {
  return new ApolloServer({
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
};

export const createApolloTestServer = async (): Promise<ApolloServer> => {
  const server = new ApolloServer({ schema });

  await startStandaloneServer(server, {
    context: async () => ({ prismaClient }),
  });

  return server;
};
