import React, { useEffect, useState } from 'react'
import { Task } from '../../models/task'

type ModalProps = {
  isOpen: boolean
  onClose: () => void
  task: Task | null
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, task }) => {
  const [editedTitle, setEditedTitle] = useState('')

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeModal()
      }
    }

    document.addEventListener('keydown', handleEscapeKey)

    return () => {
      document.removeEventListener('keydown', handleEscapeKey)
    }
  }, [])

  const closeModal = () => {
    onClose()
    setEditedTitle('')
  }

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedTitle(event.target.value)
  }

  if (!isOpen || !task) {
    return null
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-zinc-700 opacity-50"></div>
      <div className="relative z-10 flex h-1/3 w-1/3 flex-col items-center rounded-lg bg-white p-6 shadow-md">
        <span className="absolute left-4 top-4 text-zinc-400">#{task.id}</span>
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
            value={editedTitle !== '' ? editedTitle : task.title}
            onChange={handleTitleChange}
          />
        </h2>

        <div className="mt-auto flex items-center gap-3">
          <button className="mt-4 rounded bg-red-500 px-4 py-2 text-white">
            Deletar
          </button>

          {!task.concluded && (
            <button className="mt-4 rounded bg-green-400 px-4 py-2 text-white">
              Marcar como Concluída
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Modal
