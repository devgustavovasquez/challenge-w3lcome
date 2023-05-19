import axios from 'axios'

export class TaskAPI {
  private static readonly url = axios.create({
    baseURL: 'http://localhost:8080',
  })

  public static async listAll() {
    return this.url.get('/tasks')
  }
}
