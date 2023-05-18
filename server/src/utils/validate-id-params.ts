import { NextFunction, Request, Response } from "express";
import { BadRequestError } from "../infra/http/errors/bad-request";

export const validateIdParams = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { id } = request.params;

  if (!id) {
    throw new BadRequestError("Missing id param");
  }

  if (isNaN(parseInt(id))) {
    throw new BadRequestError("Invalid id param");
  }

  return next();
};
