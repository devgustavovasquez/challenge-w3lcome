import { ChangeEvent, useEffect, useState } from 'react'
import { Task } from '../../models/task'
import useMutation from '../../hooks/useMutation'
import { TaskService } from '../../services/task/TaskService'

type ModalProps = {
  isOpen: boolean
  onClose: () => void
  onUpdateTask: (task: Task) => void
  onDeleteTask: (taskId: number) => void
  task: Task | null
}

export default function Modal({
  isOpen,
  onClose,
  task,
  onDeleteTask,
  onUpdateTask,
}: ModalProps) {
  const [editedTask, setEditedTask] = useState<Task | null>(null)
  const { mutate: updateMutate } = useMutation<Task>(TaskService.update, {
    onError: (error) => {
      console.error('Error updating task:', error)
    },
  })
  const { mutate: deleteMutate } = useMutation<void>(TaskService.delete, {
    onError: (error) => {
      console.error('Error deleting task:', error)
    },
  })

  useEffect(() => {
    setEditedTask(task)
  }, [task])

  function closeModal() {
    onClose()
    setEditedTask(null)
  }

  function handleTitleChange(event: ChangeEvent<HTMLInputElement>) {
    const newTitle = event.target.value
    setEditedTask((prevTask) => {
      if (prevTask) {
        const updatedTask: Task = { ...prevTask, title: newTitle }
        updateMutate(updatedTask)
        onUpdateTask(updatedTask)
        return updatedTask
      }
      return null
    })
  }

  function handleTaskConcluded() {
    if (editedTask) {
      updateMutate({ ...editedTask, concluded: true })
      closeModal()
      onUpdateTask({ ...editedTask, concluded: true })
    }
  }

  function handleDeleteTask() {
    if (editedTask) {
      deleteMutate(editedTask.id)
      onDeleteTask(editedTask.id)
      closeModal()
    }
  }

  if (!isOpen || !editedTask) {
    return null
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-zinc-700 opacity-50"></div>
      <div className="relative z-10 flex h-1/3 w-1/3 flex-col items-center rounded-lg bg-white p-6 shadow-md">
        <span className="absolute left-4 top-4 text-zinc-400">
          #{editedTask.id}
        </span>
        <button
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded bg-red-500 font-bold text-white"
          onClick={closeModal}
        >
          X
        </button>
        <h2 className="text-center text-2xl font-bold text-zinc-700">
          <input
            type="text"
            className="border-b-2 border-zinc-700 text-center text-2xl font-bold text-zinc-700 focus:outline-none"
            value={editedTask.title}
            onChange={handleTitleChange}
          />
        </h2>

        <div className="mt-auto flex items-center gap-3">
          <button
            className="mt-4 rounded bg-red-500 px-4 py-2 text-white"
            onClick={handleDeleteTask}
          >
            Deletar
          </button>

          {!editedTask.concluded && (
            <button
              className="mt-4 rounded bg-green-400 px-4 py-2 text-white"
              onClick={handleTaskConcluded}
            >
              Marcar como Concluída
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
