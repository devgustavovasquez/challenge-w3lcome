import express, { Application } from "express";
import { TasksController } from "./infra/http/controllers/tasks-controller";

const app: Application = express();
app.use(express.json());

new TasksController(app);

const port = 8080;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
