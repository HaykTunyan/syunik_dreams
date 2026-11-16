

import { writeFileSync } from 'node:fs';
import { buildChunks } from '../src/lib/rag/chunks';
import { embed } from '../src/lib/rag/embed';

const chunks = await buildChunks();
const BATCH = 64;
const vectors: number[][] = [];

for (let i = 0; i < chunks.length; i += BATCH) {
    const batch = chunks.slice(i, i + BATCH).map((c) => c.content);
    vectors.push(...(await embed(batch, 'document')));
}

const index = chunks.map((c, i) => ({ ...c, embedding: vectors[i] }));
writeFileSync('src/data/rag-index.json', JSON.stringify(index));
console.log(`Indexed ${index.length} chunks`);