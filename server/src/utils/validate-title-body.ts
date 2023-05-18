import { NextFunction, Request, Response } from "express";
import { BadRequestError } from "../infra/http/errors/bad-request";

export const validateTitleBody = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { title } = request.body;

  if (!title) {
    throw new BadRequestError("Missing title param");
  }

  if (typeof title !== "string") {
    throw new BadRequestError("Invalid title param");
  }

  return next();
};
