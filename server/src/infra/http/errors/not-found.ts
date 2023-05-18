import { HTTPError } from "./http-error";

export class NotFoundError extends HTTPError {
  constructor(message: string) {
    super(404, message);
    this.name = "NotFound";
  }
}
