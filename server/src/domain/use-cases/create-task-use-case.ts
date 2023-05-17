import { Task } from "../entities/task";
import { TasksRepository } from "../repositories/tasks-repository";

interface CreateTaskRequest {
  title: string;
}

interface CreateTaskResponse {
  task: Task;
}

export class CreateTask {
  constructor(private readonly tasksRepositories: TasksRepository) {}

  async execute(request: CreateTaskRequest): Promise<CreateTaskResponse> {
    const { title } = request;

    const latestTask = await this.tasksRepositories.getLatest();
    const id = latestTask ? latestTask.id + 1 : 1;

    const task = new Task(
      {
        title,
        concluded: false,
      },
      id
    );

    await this.tasksRepositories.save(task);

    return { task };
  }
}
