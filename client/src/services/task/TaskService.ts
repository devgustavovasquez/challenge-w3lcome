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

  static async update(task: Task) {
    try {
      const response = await TaskAPI.update(task)

      return response.data
    } catch (error) {
      throw new Error('Error updating task')
    }
  }

  static async delete(id: Pick<Task, 'id'>) {
    try {
      const response = await TaskAPI.delete(id)

      return response.data
    } catch (error) {
      throw new Error('Error deleting task')
    }
  }
}
