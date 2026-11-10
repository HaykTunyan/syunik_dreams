
// src/components/ChatWidget.tsx
'use client';
import { useState } from 'react';

type Source = { title: string; url: string };

export function ChatWidget({ lang }: { lang: 'en' | 'hy' }) {
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [sources, setSources] = useState<Source[]>([]);
    const [loading, setLoading] = useState(false);

    async function ask() {
        if (!question.trim() || loading) return;
        setLoading(true);
        setAnswer('');
        setSources([]);

        try {
            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ question, lang }),
            });
            if (!res.ok || !res.body) throw new Error('Request failed');

            const header = res.headers.get('X-Sources');
            if (header) setSources(JSON.parse(decodeURIComponent(header)));

            const reader = res.body.getReader();
            const decoder = new TextDecoder();
            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                setAnswer((prev) => prev + decoder.decode(value, { stream: true }));
            }
        } catch {
            setAnswer(lang === 'hy' ? 'Սխալ տեղի ունեցավ։ Փորձիր նորից։' : 'Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <input value={question} onChange={(e) => setQuestion(e.target.value)} />
            <button onClick={ask} disabled={loading}>Ask</button>
            <p>{answer}</p>
            {sources.map((s) => (
                <a key={s.url} href={s.url}>{s.title}</a>
            ))}
        </div>
    );
}