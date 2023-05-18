import { Task } from "../../../domain/entities/task";

export class TaskViewModel {
  static toHTTP(raw: Task) {
    return {
      id: raw.id,
      title: raw.title,
      concluded: raw.concluded,
    };
  }
}
