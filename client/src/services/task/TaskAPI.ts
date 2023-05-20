import axios from 'axios'
import { Task } from '../../models/task'

export class TaskAPI {
  private static readonly url = axios.create({
    baseURL: 'http://localhost:8080',
  })

  public static async listAll() {
    return this.url.get('/tasks')
  }

  public static async create(title: Pick<Task, 'title'>) {
    return this.url.post('/tasks', {
      title,
    })
  }

  public static async update(task: Task) {
    return this.url.patch(`/tasks/${task.id}`, {
      title: task.title,
      concluded: task.concluded,
    })
  }

  public static async delete(id: Pick<Task, 'id'>) {
    return this.url.delete(`/tasks/${id}`)
  }
}
