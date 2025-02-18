import { Request, Response, NextFunction } from "express";

interface CustomError extends Error {
  statusCode?: number;
}

const errorHandler = (
  err: CustomError,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  const response: {
    status: string;
    statusCode: number;
    message: string;
    stack?: string;
  } = {
    status: "error",
    statusCode,
    message,
  };

  if (process.env.NODE_ENV === "development" && err.stack) {
    response.stack = err.stack;
  }

  res.status(statusCode).json(response);
};

export default errorHandler;
