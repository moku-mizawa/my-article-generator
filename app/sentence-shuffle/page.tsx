"use client";

import { useState } from 'react';
import { shuffleSentences } from './actions';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

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
    <Card>
        <CardHeader>
            <CardTitle>英文シャッフルアプリケーション</CardTitle>
        </CardHeader>
        <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="英文を入力"
                required
                className="w-full p-2 border rounded"
                />
                <Button type="submit" disabled={isLoading}>
                {isLoading ? 'シャッフル中...' : 'シャッフル'}
                </Button>
            </form>

            {error && <p className="text-red-500 mt-4">{error}</p>}
            {shuffledSentences.length > 0 && (
                <div className="mt-6">
                    <h2 className="text-lg font-semibold mb-2">シャッフルされた英文:</h2>
                    {shuffledSentences.map((sentence, index) => (
                        <div key={index} className="whitespace-pre-wrap">
                            [{sentence.join('/')}].
                        </div>
                    ))}
                    </div>
                )}
            </CardContent>
        </Card>
    </div>
  );
}