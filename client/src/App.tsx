import Navbar from './components/Navbar'

export default function App() {
  return (
    <div className="h-screen bg-indigo-50">
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

          <ul className="flex w-full flex-col gap-4">
            <li className="flex min-h-[6rem] w-full items-center justify-between rounded-md bg-white px-4 py-7 shadow-md">
              <span className="max-w-[14rem] break-words text-base text-zinc-700">
                Limpar Toda a Casa e o Quintal e o Jardim e a Garagem e a Sala e
                o Quarto e a Cozinha e o Banheiro e a Lavanderia e a Varanda e a
                Área de Serviço
              </span>
              <div className="flex h-full flex-col items-end justify-between">
                <span className="text-zinc-400">#1</span>
                <span className="text-sm font-semibold text-red-400">
                  Pendente
                </span>
              </div>
            </li>
            <li className="flex min-h-[6rem] w-full items-center justify-between rounded-md bg-white px-4 py-7 shadow-md">
              <span className="max-w-[14rem] break-words text-base text-zinc-700">
                Preparar o Almoço
              </span>
              <div className="flex h-full flex-col items-end justify-between">
                <span className="text-zinc-400">#1</span>
                <span className="text-sm font-semibold text-green-400">
                  Concluída
                </span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
