import http from "http";
import { expressMiddleware } from "@apollo/server/express4";
import { AddressInfo } from "net";
import { createApolloServer } from "../infrastructure/apollo";
import { applicationDebug } from "../infrastructure/debug";
import { createExpressApp } from "../infrastructure/express";
import { applicationContext } from "../infrastructure/graphql";

const port = normalizePort(process.env.PORT || "3000");

startServer();

async function startServer() {
  const expressApp = createExpressApp();
  const httpServer = http.createServer(expressApp);
  const apolloServer = createApolloServer(httpServer);

  await apolloServer.start();

  expressApp.use(
    "/",
    expressMiddleware(apolloServer, {
      context: async () => applicationContext,
    }),
  );

  httpServer.on("error", onError);
  httpServer.on("listening", () => onListening(httpServer.address()));
  httpServer.listen({ port: port });
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
  applicationDebug("Listening on " + bind);
}
