Desafio 1: NodeJS - Criação de uma API simples
Crie uma API REST simples usando Node.js e Express (se possivel usando
Typescript). A API deve ter 4 endpoints:

1. GET /tasks: Retorna um array de objetos de tarefa no formato JSON.

2. POST /tasks: Aceita um objeto de tarefa no corpo da requisição (formato JSON) e adiciona-o ao array de tarefas.

3. PATCH /tasks: Aceita um id de uma tarefa e um objeto de tarefa no corpo da requisição (formato JSON) e atualiza a tarefa no array.

4. DELETE /tasks: Aceita um id de uma tarefa e remove a tarefa do array.

Use o seguinte array de tarefas como exemplo inicial para armazenar os dados em memória:

const tasks = [
{ id: 1, titulo: "Aprender React", concluida: true },
{ id: 2, titulo: "Estudar NodeJS", concluida: false },
{ id: 3, titulo: "Praticar TypeScript", concluida: false }
];

Atenção: Não precisa de conexão com banco de dados. Fique a vontade para adicionar
mais informações na API caso necessário. Não precisa ser nada muito completo, o que
vamos avaliar é a funcionalidade, código e organização.
