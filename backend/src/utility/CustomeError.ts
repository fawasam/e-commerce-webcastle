import { Response } from "express";
import { ErrorType } from "../types";

class CustomError extends Error {
  statusCode: number;
  status?: string;
  isOperational?: boolean;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.status = statusCode >= 400 && statusCode <= 500 ? "fail" : "error";
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

const devErrors = (res: Response, error: ErrorType) => {
  res.status(error.statusCode).json({
    status: error.status,
    message: error.message,
    stackTrace: error.stack,
    error: error,
  });
};
const prodErrors = (res: Response, error: ErrorType) => {
  if (error.isOperational) {
    res.status(error.statusCode).json({
      status: error.status,
      message: error.message,
    });
  } else {
    res.status(500).json({
      status: "error",
      message: "Something went wrong! Please try again later",
    });
  }
};

export { CustomError, devErrors, prodErrors };
