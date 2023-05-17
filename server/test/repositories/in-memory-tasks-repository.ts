import { Task } from "../../src/domain/entities/task";
import { TasksRepository } from "../../src/domain/repositories/tasks-repository";

export class InMemoryTasksRepository implements TasksRepository {
  public tasks: Task[] = [];

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
