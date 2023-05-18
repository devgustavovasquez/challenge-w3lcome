import { NotFoundError } from "../../infra/http/errors/not-found";
import { Task } from "../entities/task";
import { TasksRepository } from "../repositories/tasks-repository";

interface DeleteTaskRequest {
  taskId: number;
}

type DeleteTaskResponse = void;

export class DeleteTask {
  constructor(private readonly tasksRepositories: TasksRepository) {}

  async execute(request: DeleteTaskRequest): Promise<DeleteTaskResponse> {
    const { taskId } = request;

    const task = await this.tasksRepositories.findById(taskId);

    if (!task) {
      throw new NotFoundError(`Task with id ${taskId} not found`);
    }

    await this.tasksRepositories.delete(task);

    return;
  }
}
