interface CardProps {
  id: number
  title: string
  concluded: boolean
}

export default function Card(props: CardProps) {
  return (
    <li className="flex h-[6rem] w-full cursor-pointer items-center justify-between rounded-md bg-white px-4 py-7 shadow-md">
      <span className="w-2/3 overflow-hidden text-ellipsis whitespace-nowrap text-base text-zinc-700">
        {props.title}
      </span>
      <div className="flex h-full flex-col items-end justify-between">
        <span className="text-zinc-400">#{props.id}</span>
        <span
          className={`text-sm font-semibold ${
            props.concluded ? 'text-green-400' : 'text-red-400'
          }`}
        >
          {props.concluded ? 'Concluída' : 'Pendente'}
        </span>
      </div>
    </li>
  )
}
