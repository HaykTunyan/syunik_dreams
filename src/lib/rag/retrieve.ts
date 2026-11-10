

// src/lib/rag/retrieve.ts
import index from '@/data/rag-index.json';
import { embed } from './embed';
import type { Chunk } from './chunks';

export type IndexedChunk = Chunk & {
    embedding: number[];
};

function cosine(a: number[], b: number[]) {
    let dot = 0, na = 0, nb = 0;
    for (let i = 0; i < a.length; i++) {
        dot += a[i] * b[i];
        na += a[i] * a[i];
        nb += b[i] * b[i];
    }
    return dot / (Math.sqrt(na) * Math.sqrt(nb));
}

export async function retrieve(question: string, lang: string, k = 5) {
    const [q] = await embed([question], 'query');

    return (index as unknown as IndexedChunk[])
        .filter((c) => c.lang === lang)
        .map((c) => ({ chunk: c, score: cosine(q, c.embedding) }))
        .sort((a, b) => b.score - a.score)
        .slice(0, k);
}