export class HTTPError extends Error {
  constructor(public statusCode: number, message: string) {
    super(message);
    this.name = "HTTPError";
    this.statusCode = statusCode;
  }
}
