import { Task } from "../entities/task";
import { TasksRepository } from "../repositories/tasks-repository";

type ListAllTasksRequest = void;

interface ListAllTasksResponse {
  tasks: Task[];
}

export class ListAllTasks {
  constructor(private readonly tasksRepositories: TasksRepository) {}

  async execute(request: ListAllTasksRequest): Promise<ListAllTasksResponse> {
    const tasks = await this.tasksRepositories.findAll();

    const sortedTasks = tasks.sort((a, b) => a.id - b.id);

    return { tasks: sortedTasks };
  }
}
