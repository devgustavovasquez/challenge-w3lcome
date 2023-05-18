import { makeTask } from "../../../test/factories/task-factory";
import { InMemoryTasksRepository } from "../../../test/repositories/in-memory-tasks-repository";
import { NotFoundError } from "../../infra/http/errors/not-found";
import { TasksRepository } from "../repositories/tasks-repository";
import { UpdateTask } from "./update-task-use-case";

describe("UpdateTask", () => {
  let sut: UpdateTask;
  let tasksRepository: TasksRepository;

  beforeEach(() => {
    tasksRepository = new InMemoryTasksRepository();
    sut = new UpdateTask(tasksRepository);
  });

  it("should update a task's title", async () => {
    const updatedTitle = "Updated Task Title";

    const task = makeTask();

    tasksRepository.findById = jest.fn().mockResolvedValue(task);

    const response = await sut.execute({
      id: 1,
      title: updatedTitle,
      concluded: false,
    });

    expect(response.task.title).toBe(updatedTitle);
    expect(tasksRepository.findById).toHaveBeenCalledWith(1);
  });

  it("should mark a task as concluded", async () => {
    const task = makeTask();

    tasksRepository.findById = jest.fn().mockResolvedValue(task);

    const response = await sut.execute({
      id: 1,
      title: "Task",
      concluded: true,
    });

    expect(response.task.concluded).toBe(true);
    expect(tasksRepository.findById).toHaveBeenCalledWith(1);
  });

  it("should throw an error if the task does not exist", async () => {
    tasksRepository.findById = jest.fn().mockResolvedValue(undefined);

    await expect(
      sut.execute({
        id: 1,
        title: "Task",
        concluded: false,
      })
    ).rejects.toThrow(NotFoundError);
  });
});
