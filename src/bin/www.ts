import cors from "cors";
import debugLib from "debug";
import http from "http";
import cookieParser from "cookie-parser";
import logger from "morgan";
import express, { Application } from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { AddressInfo } from "net";
import { resolvers, typeDefs } from "../graphql/schema";

const debug = debugLib("game-assets-marketplace-api:server");
const port = normalizePort(process.env.PORT || "3000");

startServer();

async function startServer() {
  const expressApp = createExpressApp();
  const httpServer = http.createServer(expressApp);
  const apolloServer = createApolloServer(httpServer);

  await apolloServer.start();

  expressApp.use("/", expressMiddleware(apolloServer));

  httpServer.on("error", onError);
  httpServer.on("listening", () => onListening(httpServer.address()));
  httpServer.listen({ port: port });
}

function createApolloServer(
  httpServer: http.Server<
    typeof http.IncomingMessage,
    typeof http.ServerResponse
  >,
): ApolloServer {
  return new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
}

function createExpressApp(): express.Application {
  const expressApp: Application = express();

  expressApp.use(logger("dev"));
  expressApp.use(express.json());
  expressApp.use(cors<cors.CorsRequest>());
  expressApp.use(express.urlencoded({ extended: false }));
  expressApp.use(cookieParser());

  return expressApp;
}

function normalizePort(val: string): number | string | false {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
}

function onError(error: NodeJS.ErrnoException): void {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
    default:
      throw error;
  }
}

function onListening(addr: string | AddressInfo | null): void {
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr?.port;
  debug("Listening on " + bind);
}
