
# mini-rag

TypeScript RAG project: Voyage embeddings + Postgres/pgvector + Claude for answers.

## Commands
- `docker compose up -d`  start Postgres
- `npm run ingest`        index docs/*.md
- `npm run ask -- "..."`  ask a question

## Structure
- `src/lib.ts`     embed(), chunkMarkdown(), db pool
- `src/config.ts`  ALL tunable RAG settings (chunk size, topK, tiers). Change settings here only.
- `src/ingest.ts`, `src/ask.ts`  entry points
- `schema.sql`     table + HNSW index (VECTOR(1024))

## Conventions
- TypeScript strict, ESM, no new dependencies without asking.
- Model names live in `src/config.ts`; never hardcode them elsewhere.
- Changing the embedding model requires re-running ingest and matching VECTOR(n).

## Working rules (save tokens)
- Make only the change I ask for. Do not refactor or reformat other code.
- Show diffs or changed functions only, not whole files.
- Keep explanations to a few sentences unless I ask for detail.
- Read only the files needed for the task; do not scan the whole repo.
- Do not touch `docs/`, `node_modules/`, lockfiles, or `.env`.