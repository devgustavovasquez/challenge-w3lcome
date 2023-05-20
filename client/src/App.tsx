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
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)

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

  function handleUpdateTask(updatedTask: Task) {
    setTasks((prevTasks) => {
      const tasks = [...prevTasks]
      const taskIndex = tasks.findIndex((task) => task.id === updatedTask.id)
      tasks[taskIndex] = updatedTask
      return tasks
    })
  }

  function handleDeleteTask(taskId: number) {
    setTasks((prevTasks) => {
      const tasks = [...prevTasks]
      const taskIndex = tasks.findIndex((task) => task.id === taskId)
      tasks.splice(taskIndex, 1)
      return tasks
    })
  }

  function handleOpenModal(task: Task) {
    setSelectedTask(task)
    setIsModalOpen(true)
  }

  function handleCloseModal() {
    setSelectedTask(null)
    setIsModalOpen(false)
  }

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

          <InputTask onAddTask={handleAddTask} />

          <ul className="flex max-h-[40rem] w-full flex-col gap-4 overflow-y-auto scroll-smooth py-4 pr-1">
            {tasks.map((task) => (
              <Card key={task.id} {...task} onClick={handleOpenModal} />
            ))}
          </ul>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onUpdateTask={handleUpdateTask}
        onDeleteTask={handleDeleteTask}
        task={selectedTask}
      />
    </div>
  )
}
