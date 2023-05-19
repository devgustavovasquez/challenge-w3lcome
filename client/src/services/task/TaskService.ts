import { Task } from '../../models/task'
import { TaskAPI } from './TaskAPI'

export class TaskService {
  static async listAll() {
    try {
      const response = await TaskAPI.listAll()

      return response.data
    } catch (error) {
      throw new Error('Error fetching tasks')
    }
  }

  static async create(data: Pick<Task, 'title'>) {
    try {
      const response = await TaskAPI.create(data)

      return response.data
    } catch (error) {
      throw new Error('Error creating task')
    }
  }
}
