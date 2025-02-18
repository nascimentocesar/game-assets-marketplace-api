import express, { Application } from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";

import indexRouter from "./routes/index";
import productsRouter from "./routes/products";
import usersRouter from "./routes/users";
import errorHandler from "./middleware/errorHandler";

const app: Application = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", indexRouter);
app.use("/products", productsRouter);
app.use("/users", usersRouter);

app.use(errorHandler);

export default app;
