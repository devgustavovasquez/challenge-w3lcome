import { useState } from 'react'
import useMutation from '../../hooks/useMutation'
import { TaskService } from '../../services/task/TaskService'
import { Task } from '../../models/task'

interface InputTaskProps {
  onAddTask: (task: Task) => void
}

export default function InputTask({ onAddTask }: InputTaskProps) {
  const [text, setText] = useState('')
  const { mutate } = useMutation(TaskService.create, {
    onSuccess: (data) => {
      setText('')
      onAddTask(data)
    },
    onError: (error) => {
      console.error('Error creating todo:', error)
    },
  })

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    mutate(text)
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      if (text === '') return
      handleSubmit(event)
    }
  }

  return (
    <div className="my-6 flex w-full items-center justify-between gap-4">
      <input
        type="text"
        className="w-full rounded-md border border-gray-300 px-4 py-2"
        placeholder="Nova tarefa"
        value={text}
        onChange={(event) => setText(event.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button
        className="rounded-md border border-gray-300 bg-zinc-700 px-4 py-2 font-semibold text-white"
        onClick={handleSubmit}
      >
        +
      </button>
    </div>
  )
}
