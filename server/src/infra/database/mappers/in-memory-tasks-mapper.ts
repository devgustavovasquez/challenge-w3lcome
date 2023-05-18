import { Task } from "../../../domain/entities/task";
import { MemoryTask } from "../data";

export class InMemoryTasksMapper {
  static toDomain(raw: MemoryTask): Task {
    return new Task(
      {
        title: raw.titulo,
        concluded: raw.concluida,
      },
      raw.id
    );
  }

  static toPersistence(task: Task): MemoryTask {
    return {
      id: task.id,
      titulo: task.title,
      concluida: task.concluded,
    };
  }
}
