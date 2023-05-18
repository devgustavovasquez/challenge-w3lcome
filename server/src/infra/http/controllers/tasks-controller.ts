import { Application, Request, Response } from "express";

import { TasksRepository } from "../../../domain/repositories/tasks-repository";
import { InMemoryTasksRepository } from "../../database/repositories/in-memory-tasks-repository";

import { ListAllTasks } from "../../../domain/use-cases/list-all-tasks-use-case";
import { CreateTask } from "../../../domain/use-cases/create-task-use-case";
import { DeleteTask } from "../../../domain/use-cases/delete-task-use-case";
import { UpdateTask } from "../../../domain/use-cases/update-task-use-case";

export class TasksController {
  private readonly application: Application;
  private readonly tasksRepository: TasksRepository;

  constructor(application: Application) {
    this.application = application;
    this.registerRoutes();

    this.tasksRepository = new InMemoryTasksRepository();
  }

  private registerRoutes() {
    this.application.get(
      "/tasks",
      async (request: Request, response: Response) => {
        const listAllTasks = new ListAllTasks(this.tasksRepository);
        const tasks = await listAllTasks.execute();

        return response.json(tasks);
      }
    );

    this.application.post(
      "/tasks",
      async (request: Request, response: Response) => {
        const { title } = request.body;

        const createTask = new CreateTask(this.tasksRepository);
        const task = await createTask.execute({ title });

        return response.json(task);
      }
    );

    this.application.patch(
      "/tasks/:id",
      async (request: Request, response: Response) => {
        const { id } = request.params;
        const { title, concluded } = request.body;

        const updateTask = new UpdateTask(this.tasksRepository);
        const task = await updateTask.execute({
          id: parseInt(id),
          title,
          concluded,
        });

        return response.json(task);
      }
    );

    this.application.delete(
      "/tasks/:id",
      async (request: Request, response: Response) => {
        const { id } = request.params;

        const deleteTask = new DeleteTask(this.tasksRepository);
        await deleteTask.execute({ taskId: parseInt(id) });

        return response.status(204).send();
      }
    );
  }
}
