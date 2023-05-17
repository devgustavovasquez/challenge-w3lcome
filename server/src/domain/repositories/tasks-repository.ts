import { Task } from "../entities/task";

export abstract class TasksRepository {
  abstract save(task: Task): Promise<void>;
  abstract update(task: Task): Promise<void>;
  abstract delete(task: Task): Promise<void>;
  abstract getLatest(): Promise<Task | undefined>;
  abstract findById(id: number): Promise<Task | undefined>;
  abstract findAll(): Promise<Task[]>;
}
