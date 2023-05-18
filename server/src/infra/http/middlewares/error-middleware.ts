import { Application, NextFunction, Request, Response } from "express";
import { HTTPError } from "../errors/http-error";

export class ErrorMiddleware {
  private readonly application: Application;

  constructor(application: Application) {
    this.application = application;
    this.registerRoutes();
  }

  private registerRoutes() {
    this.application.use(
      (err: Error, _req: Request, res: Response, _next: NextFunction) => {
        if (err instanceof HTTPError) {
          if (err.statusCode >= 500) {
            console.error(err);
          }

          return res.status(err.statusCode).json({ error: err.message });
        }

        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
    );
  }
}
