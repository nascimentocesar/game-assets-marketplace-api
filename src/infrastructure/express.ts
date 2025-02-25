import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";
import express, { Application } from "express";

export const createExpressApp = (): express.Application => {
  const expressApp: Application = express();

  expressApp.use(logger("dev"));
  expressApp.use(express.json());
  expressApp.use(cors<cors.CorsRequest>());
  expressApp.use(express.urlencoded({ extended: false }));
  expressApp.use(cookieParser());

  return expressApp;
};
