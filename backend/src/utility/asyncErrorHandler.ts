import { Request, Response, NextFunction } from "express";
export const asyncErrorHandler = (func) => {
  return (req: Request, res: Response, next: NextFunction) => {
    func(req, res, next).catch((err: any) => next(err));
  };
};
