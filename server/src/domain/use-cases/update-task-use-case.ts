import { Task } from "../entities/task";
import { TasksRepository } from "../repositories/tasks-repository";

interface UpdateTaskRequest {
  id: number;
  title: string;
  concluded: boolean;
}

interface UpdateTaskResponse {
  task: Task;
}

export class UpdateTask {
  constructor(private readonly tasksRepositories: TasksRepository) {}

  async execute(request: UpdateTaskRequest): Promise<UpdateTaskResponse> {
    const { id, title, concluded } = request;

    const task = await this.tasksRepositories.findById(id);

    if (!task) {
      throw new Error("Task not found");
    }

    task.title = title;

    if (concluded && !task.concluded) {
      task.markAsConcluded();
    }

    return { task };
  }
}
