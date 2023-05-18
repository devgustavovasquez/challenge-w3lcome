export interface MemoryTask {
  id: number;
  titulo: string;
  concluida: boolean;
}

export const data: MemoryTask[] = [
  { id: 1, titulo: "Aprender React", concluida: true },
  { id: 2, titulo: "Estudar NodeJS", concluida: false },
  { id: 3, titulo: "Praticar TypeScript", concluida: false },
];
