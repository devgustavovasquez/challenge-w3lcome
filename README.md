# Desafio W3lcome

Esse é um projeto de teste técnico proposto pela W3lcome. O teste em si é simples: desenvolver um "to-do app" de ponta a ponta (back e front).

## Rodando localmente

Clone o projeto

```bash
  git clone https://github.com/devgustavovasquez/challenge-w3lcome.git
```

Entre no diretório do projeto

```bash
  cd challenge-w3lcome
```

Inicialize usando o docker-compose (recomendado)

```bash
  docker compose up -d
```

Acesse o endereço

```bash
  http://localhost:8081

  API: http://localhost:8080
```

## Alternativa ao Docker

Será necessário ter o Node instalado. Estou usando a versão 18.16.

#### Setup Server

Entre no diretório server

```bash
  cd server
```

Instale as dependencias

```bash
  npm install
```

Gere a build

```bash
  npm run build
```

Rode o server

```bash
  npm run start
```

#### Setup Client

Entre no diretório server

```bash
  cd client
```

Instale as dependencias

```bash
  npm install
```

Gere a build

```bash
  npm run build
```

Rode o server

```bash
  npm run preview
```

## Observações

Os arquivos .env não estariam commitados em um projeto real.

As aplicações foram construidas usando TypeScript, React (SPA) e Express.

No desenvolvimento do back-end, me preocupei com cada detalhe das regras de negócio, usando DDD, Testes e Clean Arch para auxiliar.

No desenvolvimento do front-end, busquei não utilizar muitas libs prontas, como "react-query" que seria uma ótima opção para requests. Mas implementei a lógica da lib na unha. Também busquei separar ao máximo a camada de service e as estruturas (components).
