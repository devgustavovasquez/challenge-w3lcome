import { Task } from '../../models/task'

interface CardProps {
  id: number
  title: string
  concluded: boolean
  onClick: (task: Task) => void
}

export default function Card({ id, title, concluded, onClick }: CardProps) {
  return (
    <li
      className="flex h-[6rem] w-full cursor-pointer items-center justify-between rounded-md bg-white px-4 py-7 shadow-md"
      onClick={() => onClick({ id, title, concluded })}
    >
      <span className="w-2/3 overflow-hidden text-ellipsis whitespace-nowrap text-base text-zinc-700">
        {title}
      </span>
      <div className="flex h-full flex-col items-end justify-between">
        <span className="text-zinc-400">#{id}</span>
        <span
          className={`text-sm font-semibold ${
            concluded ? 'text-green-400' : 'text-red-400'
          }`}
        >
          {concluded ? 'Concluída' : 'Pendente'}
        </span>
      </div>
    </li>
  )
}
