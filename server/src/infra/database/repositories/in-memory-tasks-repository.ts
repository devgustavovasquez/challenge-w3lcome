import { Task } from "../../../domain/entities/task";
import { TasksRepository } from "../../../domain/repositories/tasks-repository";
import { data } from "../data";
import { InMemoryTasksMapper } from "../mappers/in-memory-tasks-mapper";

export class InMemoryTasksRepository implements TasksRepository {
  public tasks: Task[] = [];

  constructor() {
    data.forEach((task) => {
      this.tasks.push(InMemoryTasksMapper.toDomain(task));
    });
  }

  async save(task: Task) {
    this.tasks.push(task);
  }

  async update(task: Task) {
    const index = this.tasks.findIndex((t) => t.id === task.id);

    this.tasks[index] = task;
  }

  async delete(task: Task) {
    const index = this.tasks.findIndex((t) => t.id === task.id);

    this.tasks.splice(index, 1);
  }

  async getLatest() {
    const orderedTasks = this.tasks.sort((a, b) => b.id - a.id);

    return orderedTasks[0];
  }

  async findById(id: number) {
    return this.tasks.find((t) => t.id === id);
  }

  async findAll() {
    return this.tasks;
  }
}
