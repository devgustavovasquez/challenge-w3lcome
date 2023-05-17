import { InMemoryTasksRepository } from "../../../test/repositories/in-memory-tasks-repository";
import { TasksRepository } from "../repositories/tasks-repository";
import { DeleteTask } from "./delete-task-use-case";

describe("DeleteTask", () => {
  let sut: DeleteTask;
  let tasksRepository: TasksRepository;

  beforeEach(() => {
    tasksRepository = new InMemoryTasksRepository();
    sut = new DeleteTask(tasksRepository);
  });

  it("should be able to delete a task", async () => {
    const taskId = 1;
    const task = {
      id: taskId,
      title: "Task to be deleted",
      concluded: false,
    };

    tasksRepository.findById = jest.fn().mockResolvedValue(task);
    tasksRepository.delete = jest.fn();

    await sut.execute({ taskId });

    expect(tasksRepository.findById).toHaveBeenCalledWith(taskId);
    expect(tasksRepository.delete).toHaveBeenCalledWith(task);
  });

  it("should throw if the task does not exist", async () => {
    const taskId = 1;
    tasksRepository.findById = jest.fn().mockResolvedValue(null);
    tasksRepository.delete = jest.fn();

    await expect(sut.execute({ taskId })).rejects.toThrow("Task not found");

    expect(tasksRepository.findById).toHaveBeenCalledWith(taskId);
    expect(tasksRepository.delete).not.toHaveBeenCalled();
  });
});
