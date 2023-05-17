import { Task, TaskProps } from "./task";

describe("Task", () => {
  let taskProps: TaskProps;
  let task: Task;

  beforeEach(() => {
    taskProps = {
      title: "Task 1",
      concluded: false,
    };
    task = new Task(taskProps, 1);
  });

  it("should have a valid ID", () => {
    expect(task.id).toBe(1);
  });

  it("should throw an error if task is not persisted", () => {
    const invalidTask = new Task(taskProps);
    expect(() => invalidTask.id).toThrow("Task not persisted");
  });

  it("should have a title", () => {
    expect(task.title).toBe("Task 1");
  });

  it("should set a valid title", () => {
    task.title = "Updated Task";
    expect(task.title).toBe("Updated Task");
  });

  it("should throw an error if setting an empty title", () => {
    expect(() => (task.title = "")).toThrow("Invalid title");
  });

  it("should have a concluded status", () => {
    expect(task.concluded).toBe(false);
  });

  it("should set the concluded status", () => {
    task.concluded = true;
    expect(task.concluded).toBe(true);
  });

  it("should throw an error when marking an already concluded task", () => {
    task.concluded = true;
    expect(() => task.markAsConcluded()).toThrow(
      "Task already marked as concluded"
    );
  });

  it("should mark a task as concluded", () => {
    task.markAsConcluded();
    expect(task.concluded).toBe(true);
  });
});
