import Card from './components/Card/Card'
import Navbar from './components/Navbar'
import { useQuery } from './hooks/useQuery'
import { Task } from './models/task'
import { TaskService } from './services/task/TaskService'

export default function App() {
  const { data, isLoading, error } = useQuery<Task[]>(TaskService.listAll)

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  return (
    <div className="flex h-screen flex-col bg-indigo-50">
      <Navbar />
      <div className="mt-8 flex h-full flex-col items-center">
        <div className="w-full max-w-md p-8">
          <h2 className="text-center text-4xl font-bold text-zinc-700">
            Tarefas
          </h2>

          <div className="my-6 flex w-full items-center justify-between gap-4">
            <input
              type="text"
              className="w-full rounded-md border border-gray-300 px-4 py-2"
            />
            <button className="rounded-md border border-gray-300 bg-zinc-700 px-4 py-2 font-semibold text-white">
              +
            </button>
          </div>

          <ul className="flex max-h-[40rem] w-full flex-col gap-4 overflow-y-auto scroll-smooth py-4 pr-1">
            {data?.map((task) => (
              <Card key={task.id} {...task} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
