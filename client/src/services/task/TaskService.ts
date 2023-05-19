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
}
