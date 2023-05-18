import { NextFunction, Request, Response } from "express";
import { BadRequestError } from "../infra/http/errors/bad-request";

export const validateConcludedBody = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { concluded } = request.body;

  if (concluded === undefined) {
    throw new BadRequestError("Missing concluded param");
  }

  if (typeof concluded !== "boolean") {
    throw new BadRequestError("Invalid concluded param");
  }

  return next();
};
