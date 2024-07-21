import { Request, NextFunction, Response } from "express";
import { UserPayload } from "../dto";
import { ValidateSignature } from "../utility";

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;
    }
  }
}

export const Authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const signature = await ValidateSignature(req);
  if (signature) {
    return next();
  } else {
    return res.status(400).json({ message: "User Not authorised" });
  }
};
