import { Task, TaskProps } from "../../src/domain/entities/task";

type Override = Partial<TaskProps>;

export function makeTask(override: Override = {}) {
  return new Task({
    title: "To do Something",
    concluded: false,
    ...override,
  });
}
