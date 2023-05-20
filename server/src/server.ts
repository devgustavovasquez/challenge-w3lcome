import cors from "cors";
import dotenv from "dotenv";
import express, { Application } from "express";
import { TasksController } from "./infra/http/controllers/tasks-controller";
import { ErrorMiddleware } from "./infra/http/middlewares/error-middleware";

dotenv.config();

const app: Application = express();

app.use(express.json());
app.use(cors());

new TasksController(app);
new ErrorMiddleware(app);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
