<p align="center">
  <img src="./assets/metallic-capture.png" alt="Lean Back cover" />
</p>

# Lean Back API

Backend API for conversational features built with NestJS, Prisma, and Google GenAI (Vertex AI).

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [API Overview](#api-overview)
- [Security](#security)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [Project Structure](#project-structure)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Features

- Conversation lifecycle support (`start conversation`, `send message`).
- Message persistence with PostgreSQL via Prisma.
- AI response generation through a provider abstraction.
- Request validation using DTOs and global validation pipe.
- Swagger docs available at `/docs`.
- Built-in rate limiting and API key protection on chat endpoints.

## Tech Stack

- **Framework:** NestJS
- **Language:** TypeScript
- **Database:** PostgreSQL + Prisma
- **AI Provider:** Google GenAI (Vertex AI)
- **API Docs:** Swagger / OpenAPI

## API Overview

Base URL (local): `http://localhost:3001`

### Endpoints

- `GET /`
  Basic health service

- `POST /chat/start`
  Creates a new conversation and stores request metadata.

- `POST /chat`
  Accepts a user message and conversation ID, stores history, generates AI response, and returns the generated message.

### Authentication

Protected chat endpoints require this header:

- `X-API-Key: <your-api-key>`

### Quick cURL Examples

Start a conversation:

```bash
curl -X POST "http://localhost:3001/chat/start" \
  -H "X-API-Key: your-secret-api-key" \
  -H "Content-Type: application/json"
```

Send a message:

```bash
curl -X POST "http://localhost:3001/chat" \
  -H "X-API-Key: your-secret-api-key" \
  -H "Content-Type: application/json" \
  -d '{
    "message": "What is Lean?",
    "conversationId": "replace-with-a-valid-uuid"
  }'
```

Interactive docs:

- Open `http://localhost:3001/docs`

## Security

- **API Key Guard:** `/chat/*` endpoints are protected by `X-API-Key`.
- **Timing-safe key comparison:** Uses `crypto.timingSafeEqual` to reduce timing-attack leakage.
- **Rate limiting:** Global throttling is enabled with short and long windows.
- **Validation:** Global `ValidationPipe` runs with `whitelist`, `forbidNonWhitelisted`, and `transform`.
- **CORS restrictions:** Requests are limited to explicit local and trusted origin patterns.
- **Secrets handling:** Use environment variables; never commit real keys.

## Getting Started

### 1) Prerequisites

- Node.js 20+
- pnpm 9+
- PostgreSQL database
- Google Cloud project configured for Vertex AI

### 2) Install dependencies

```bash
pnpm install
```

### 3) Configure environment

Copy the template and fill values:

```bash
cp .env.example .env
```

Then set your connection and keys in `.env`.

### 4) Run database migrations

```bash
pnpm prisma migrate deploy
```

For local schema changes during development:

```bash
pnpm prisma migrate dev
```

### 5) Start the app

```bash
pnpm run start:dev
```

The API will run on `http://localhost:3001` by default.

## Environment Variables

From `.env.example`:

- `API_KEY`: Required for authenticating protected endpoints.
- `NODE_ENV`: Runtime environment (`development`, `production`, etc.).
- `PORT`: Server port.
- `DATABASE_URL`: PostgreSQL connection string.
- `GOOGLE_API_KEY`: Template value in repo.

For current Vertex AI implementation, also provide:

- `GOOGLE_CLOUD_PROJECT`
- `GOOGLE_CLOUD_LOCATION`

## Available Scripts

- `pnpm run start` - start server.
- `pnpm run start:dev` - start in watch mode.
- `pnpm run start:prod` - run compiled build.
- `pnpm run build` - build project.
- `pnpm run lint` - run ESLint.
- `pnpm run test` - run unit tests.
- `pnpm run test:e2e` - run end-to-end tests.
- `pnpm run test:cov` - run coverage.

## Project Structure

```text
src/
  ai/                 # AI provider interfaces and Google GenAI implementation
  chat/               # Chat controller, service, DTOs, conversation module
  common/guards/      # API key guard
  prisma/             # Prisma module/service
  main.ts             # Bootstrap, CORS, pipes, Swagger
prisma/
  schema.prisma       # DB schema
```

## Testing

Run all tests:

```bash
pnpm run test
```

Run e2e tests:

```bash
pnpm run test:e2e
```

Generate coverage:

```bash
pnpm run test:cov
```

## Deployment

- Build production artifact with `pnpm run build`.
- Set required environment variables in your deployment target.
- Run with `pnpm run start:prod`.
- Ensure database migrations are applied before serving traffic.


## License

This project is [MIT licensed](./LICENSE).

## Author

[Leandro Guardia](https://github.com/leanguardia)
