import express, { Application } from "express";
import { TasksController } from "./infra/http/controllers/tasks-controller";
import { ErrorMiddleware } from "./infra/http/middlewares/error-middleware";

const app: Application = express();

app.use(express.json());

new TasksController(app);
new ErrorMiddleware(app);

const port = 8080;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
