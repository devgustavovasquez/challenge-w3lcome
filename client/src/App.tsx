import { useEffect, useState } from 'react'
import Card from './components/Card/Card'
import InputTask from './components/InputTask/InputTask'
import Navbar from './components/Navbar'
import Modal from './components/Modal/Modal'
import { useQuery } from './hooks/useQuery'
import { Task } from './models/task'
import { TaskService } from './services/task/TaskService'

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([])
  const { data, isLoading, error } = useQuery<Task[]>(TaskService.listAll)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [task, setTask] = useState<Task | null>(null)

  useEffect(() => {
    if (data) {
      setTasks(data)
    }

    return () => {
      setTasks([])
    }
  }, [data])

  function handleAddTask(newTask: Task) {
    setTasks((prevTasks) => [...prevTasks, newTask])
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  function handleOpenModal(task: Task) {
    setIsModalOpen(true)
    setTask(task)
  }

  function handleCloseModal() {
    setIsModalOpen(false)
  }

  return (
    <div className="flex h-screen flex-col bg-indigo-50">
      <Navbar />
      <div className="mt-8 flex h-full flex-col items-center">
        <div className="w-full max-w-md p-8">
          <h2 className="text-center text-4xl font-bold text-zinc-700">
            Tarefas
          </h2>

          <InputTask onAddTask={handleAddTask} />

          <ul className="flex max-h-[40rem] w-full flex-col gap-4 overflow-y-auto scroll-smooth py-4 pr-1">
            {tasks.map((task) => (
              <Card key={task.id} {...task} onClick={handleOpenModal} />
            ))}
          </ul>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal} task={task} />
    </div>
  )
}
