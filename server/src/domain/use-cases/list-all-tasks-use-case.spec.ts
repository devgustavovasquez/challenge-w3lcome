import { InMemoryTasksRepository } from "../../../test/repositories/in-memory-tasks-repository";
import { TasksRepository } from "../repositories/tasks-repository";
import { ListAllTasks } from "./list-all-tasks-use-case";

describe("ListAllTasks", () => {
  let sut: ListAllTasks;
  let tasksRepository: TasksRepository;

  beforeEach(() => {
    tasksRepository = new InMemoryTasksRepository();
    sut = new ListAllTasks(tasksRepository);
  });

  it("should list all tasks", async () => {
    const tasks = [
      { id: 1, title: "Task 1", concluded: false },
      { id: 2, title: "Task 2", concluded: true },
      { id: 3, title: "Task 3", concluded: false },
    ];
    tasksRepository.findAll = jest.fn().mockResolvedValueOnce(tasks);

    const response = await sut.execute();

    expect(response.tasks).toEqual(tasks);
    expect(tasksRepository.findAll).toHaveBeenCalled();
  });

  it("should sort tasks by id", async () => {
    const tasks = [
      { id: 3, title: "Task 3", concluded: false },
      { id: 1, title: "Task 1", concluded: false },
      { id: 2, title: "Task 2", concluded: true },
    ];
    tasksRepository.findAll = jest.fn().mockResolvedValueOnce(tasks);

    const response = await sut.execute();

    expect(response.tasks).toEqual([
      { id: 1, title: "Task 1", concluded: false },
      { id: 2, title: "Task 2", concluded: true },
      { id: 3, title: "Task 3", concluded: false },
    ]);
  });
});
