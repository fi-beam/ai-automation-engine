# AI Automation Engine - Agent Guidelines

## Project Overview
Hybrid AI automation system using Node.js + TypeScript. Express server with SQLite database, OpenAI integration, and cron-based automation engine. Designed for n8n webhook integration.

## Architecture Patterns

### Folder Organization
- `core/` - Config, logger, external clients (OpenAI)
- `services/` - Business logic, API calls, AI generation
- `routes/` - Express route handlers only
- `automations/` - node-cron scheduled jobs
- `db/` - Schema, connection, data access functions

### Naming Conventions
- Files: kebab-case with type suffix: `feature.service.ts`, `name.route.ts`, `task.cron.ts`
- Functions: camelCase, async for I/O operations
- Database tables: snake_case
- Environment variables: UPPER_SNAKE_CASE

## Code Style Rules

### TypeScript
- Strict mode enabled — no `any` types, proper null checks
- Always specify return types on exported functions
- Use `import type` for type-only imports

### Imports
- Order: external deps → core → services → db
- Use relative paths: `../core/logger` (no path aliases)
- No `.js` extensions (CommonJS output)

### Error Handling
- All async operations wrapped in try/catch
- Use `logger.error()` with context, never console.log
- Throw errors in config/initialization; handle gracefully in runtime

### Database
- SQLite via `sqlite` wrapper (promisified)
- Schema in `schema.sql`, migrations manual for now
- Data directory must exist: `./data/app.db`

## Automation Guidelines

### Cron Jobs
- Always wrap job logic in try/catch
- Log start and completion at INFO level
- Schedule format: `'0 9 * * *'` (standard cron)
- Jobs are non-blocking; don't await in main thread

### External APIs
- Twitter/Axios: Bearer token auth, validate 2xx before parsing
- OpenAI: Model locked to `gpt-4o-mini`, temp 0.7, max 300 tokens
- Retry logic not implemented yet — add if needed

## Environment Variables (Required)
```
PORT=3000
OPENAI_API_KEY=
TWITTER_BEARER_TOKEN=
```
Config throws on startup if any are missing.

## Commands
```bash
npm run dev      # ts-node-dev with hot reload
npm run build    # tsc compile to dist/
npm run start    # production (node dist/index.js)
```

## Critical Dos and Don'ts

✅ DO:
- Validate env vars in `core/config.ts` with clear error messages
- Use `logger.info()` / `logger.error()` for all logging
- Add `.catch()` to cron promises if not using async/await wrapper
- Keep route handlers thin — delegate to services

❌ DON'T:
- Use `console.log` anywhere (always use logger)
- Import from `../index` (creates circular deps)
- Modify `schema.sql` without planning migration strategy
- Leave unhandled promise rejections in automation code
- Add new dependencies without updating Dockerfile
