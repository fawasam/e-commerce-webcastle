import { NextFunction, Request, Response } from "express";
import { ErrorType } from "../types";
import { CustomError, devErrors, prodErrors } from "../utility/CustomeError";

const castErrorHandler = (err: any) => {
  const msg = `Invalid value for ${err.value}: ${err.path}`;
  return new CustomError(msg, 400);
};
const duplicateKeyErrorHandler = (err: any) => {
  let key: any, msg: any;
  if (err.keyValue) {
    if (err.keyValue.email) {
      key = "email";
    } else if (err.keyValue.username) {
      key = "username";
    }
  }

  switch (key) {
    case "email":
      msg = "Email already registered, Please login to your account";
      break;
    case "username":
      msg = "Username already exists";
      break;
    case "name":
      msg = "Product with this name already exists";
      break;
    default:
      msg = " Already Exist ";
  }
  return new CustomError(msg, 400);
};
const validationErrorHandler = (err: any) => {
  const errors = Object.values(err.errors).map((value: any) => value.message);

  const errorMessages = errors.join(". ");
  const msg = `Invalid input data: ${errorMessages}`;
  return new CustomError(msg, 400);
};
const tokenExpireErrorHandler = (err: any) => {
  const msg = `JWT has expired. Please login again!`;
  return new CustomError(msg, 401);
};
const jwtErrorHandler = (err: any) => {
  const msg = `Invalid token. Please login again!`;
  return new CustomError(msg, 401);
};

const MulterErrorHandler = (err: any) => {
  const msg = `Please provide a valid image file`;
  return new CustomError(msg, 401);
};

export const errorController = (
  error: ErrorType,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  error.statusCode = error.statusCode || 500;
  error.status = error.status || "error";
  if (process.env.NODE_ENV === "development") {
    devErrors(res, error);
  } else if (process.env.NODE_ENV === "production") {
    if (error.name === "CastError") error = castErrorHandler(error);
    if (error.name === "MulterError") error = MulterErrorHandler(error);
    if (error.code === 11000) error = duplicateKeyErrorHandler(error);
    if (error.name === "ValidationError") error = validationErrorHandler(error);
    if (error.name === "TokenExpireError")
      error = tokenExpireErrorHandler(error);
    if (error.name === "JsonWebTokenError") error = jwtErrorHandler(error);
    prodErrors(res, error);
  }
};
