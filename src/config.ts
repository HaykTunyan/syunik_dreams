

export const RAG = {
    chunk: {
        maxChars: 1200,
        overlapChars: 150,
    },
    retrieval: {
        topK: 4,
        minScore: 0.35,
        maxContextChars: 5000,
    },
    generation: {
        maxTokens: 500,
    },
    tiers: {
        fast: "claude-haiku-5-5",
        default: "claude-sonnet-5-5",
        deep: "claude-opus-5-5",
    },
    defaultTier: "default",
} as const;

export type Tier = keyof typeof RAG.tiers;

type Row = { score: number; content: string };


export function selectChunks<T extends Row>(rows: T[]): T[] {
    const out: T[] = [];
    let used = 0;
    for (const r of rows) {
        if (r.score < RAG.retrieval.minScore) continue;
        if (used + r.content.length > RAG.retrieval.maxContextChars) break;
        out.push(r);
        used += r.content.length;
    }
    return out;
}