"use client";

import { useState } from 'react';
import { shuffleSentences } from './actions';

export default function ShuffleApp() {
  const [input, setInput] = useState('');
  const [shuffledSentences, setShuffledSentences] = useState<string[][]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    const result = await shuffleSentences(input);
    setIsLoading(false);
    if (result.error) {
      setError(result.error);
    } else {
      setShuffledSentences(result.sentences);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-lg font-semibold mb-4">英文シャッフルアプリケーション</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="英文を入力"
          required
          className="w-full p-2 border rounded"
        />
        <button type="submit" disabled={isLoading} className="px-4 py-2 bg-blue-500 text-white rounded">
          {isLoading ? 'シャッフル中...' : 'シャッフル'}
        </button>
      </form>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {shuffledSentences.length > 0 && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2">シャッフルされた英文</h2>
          <div className="space-y-4">
            {shuffledSentences.map((sentence, index) => (
              <div key={index}>
                <p className="whitespace-pre-wrap">[{sentence.join('/')}].</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}