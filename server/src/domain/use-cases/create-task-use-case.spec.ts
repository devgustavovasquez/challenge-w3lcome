import { InMemoryTasksRepository } from "../../../test/repositories/in-memory-tasks-repository";
import { TasksRepository } from "../repositories/tasks-repository";
import { CreateTask } from "./create-task-use-case";

describe("CreateTask", () => {
  let sut: CreateTask;
  let tasksRepository: TasksRepository;

  beforeEach(() => {
    tasksRepository = new InMemoryTasksRepository();
    sut = new CreateTask(tasksRepository);
  });

  it("should be able create a task", async () => {
    const request = {
      title: "New Task",
    };

    tasksRepository.getLatest = jest.fn().mockResolvedValueOnce(null);
    tasksRepository.save = jest.fn();

    const response = await sut.execute(request);

    expect(response.task.id).toBe(1);
    expect(response.task.title).toBe("New Task");
    expect(response.task.concluded).toBe(false);
    expect(tasksRepository.save).toHaveBeenCalledWith(response.task);
  });

  it("should be able create a task with correct id", async () => {
    const request = {
      title: "New Task",
    };

    const latestTask = {
      id: 10,
      title: "Latest Task",
      concluded: true,
    };

    tasksRepository.getLatest = jest.fn().mockResolvedValueOnce(latestTask);
    tasksRepository.save = jest.fn();

    const response = await sut.execute(request);

    expect(response.task.id).toBe(11);
  });

  it("should be call correct repository methods", async () => {
    const request = {
      title: "New Task",
    };

    tasksRepository.getLatest = jest.fn().mockResolvedValueOnce(null);
    tasksRepository.save = jest.fn();

    await sut.execute(request);

    expect(tasksRepository.getLatest).toHaveBeenCalledTimes(1);
    expect(tasksRepository.save).toHaveBeenCalledTimes(1);
  });
});
