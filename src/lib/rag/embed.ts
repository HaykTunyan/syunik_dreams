

const MODEL = process.env.EMBEDDING_MODEL!;

/**
 * 
 * TODO: embed
 */



export async function embed(
    texts: string[],
    type: 'document' | 'query',
): Promise<number[][]> {
    const res = await fetch('https://api.voyageai.com/v1/embeddings', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.EMBEDDING_API_KEY}`,
        },
        body: JSON.stringify({ input: texts, model: MODEL, input_type: type }),
    });
    if (!res.ok) throw new Error(`Embedding failed: ${res.status}`);
    const json = await res.json();
    return json.data.map((d: { embedding: number[] }) => d.embedding);
}