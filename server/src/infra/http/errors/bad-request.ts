import { HTTPError } from "./http-error";

export class BadRequestError extends HTTPError {
  constructor(message: string) {
    super(400, message);
    this.name = "BadRequest";
  }
}
