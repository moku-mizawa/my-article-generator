'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { generateSentences } from './actions'

type Difficulty = 'Easy' | 'Normal' | 'Intermediate' | 'Difficult' | 'Challenging'

interface Sentence {
  english: string
  japanese: string
}

export default function SentenceGenerator() {
  const [input, setInput] = useState('')
  const [difficulty, setDifficulty] = useState<Difficulty>('Normal')
  const [sentences, setSentences] = useState<Sentence[]>([])
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [history, setHistory] = useState<{
    input: string
    difficulty: Difficulty
    sentences: Sentence[]
    timestamp: Date
  }[]>([])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    const result = await generateSentences({ input, difficulty })
    setIsLoading(false)
    if (result.error) {
      setError(result.error)
    } else {
      setSentences(result.sentences)
      // 履歴に追加
      setHistory(prev => [...prev, {
        input,
        difficulty,
        sentences: result.sentences,
        timestamp: new Date()
      }])
    }
  }

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>英文生成アプリケーション</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="単語やフレーズを入力"
              required
            />
            <Select value={difficulty} onValueChange={(value: Difficulty) => setDifficulty(value)}>
              <SelectTrigger>
                <SelectValue placeholder="難易度を選択" />
              </SelectTrigger>
              <SelectContent>
                {['Easy', 'Normal', 'Intermediate', 'Difficult', 'Challenging'].map((level) => (
                  <SelectItem key={level} value={level}>
                    {level}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? '生成中...' : '英文を生成'}
            </Button>
          </form>

          {error && (
            <p className="text-red-500 mt-4">{error}</p>
          )}

          {sentences.length > 0 && (
            <div className="mt-6">
              <h2 className="text-lg font-semibold mb-2">生成された英文</h2>
              <div className="space-y-4">
                {sentences.map((sentence, index) => (
                  <div key={index}>
                    <h3 className="font-medium">英文 {index + 1}</h3>
                    <p className="whitespace-pre-wrap">{sentence.english}</p>
                    <h3 className="font-medium">日本語訳</h3>
                    <p className="whitespace-pre-wrap">{sentence.japanese}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          {history.length > 0 && (
  <div className="mt-8">
    <h2 className="text-lg font-semibold mb-4">生成履歴</h2>
    <div className="space-y-6">
      {history.map((item, historyIndex) => (
        <div key={historyIndex} className="border p-4 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <p className="font-medium">検索ワード: {item.input}</p>
            <p className="text-sm text-gray-500">
              {item.timestamp.toLocaleString()}
            </p>
          </div>
          <p className="text-sm text-gray-600 mb-2">難易度: {item.difficulty}</p>
          <div className="space-y-3">
            {item.sentences.map((sentence, sentenceIndex) => (
              <div key={sentenceIndex} className="pl-4 border-l-2">
                <p>{sentence.english}</p>
                <p className="text-gray-600">{sentence.japanese}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
)}

        </CardContent>
      </Card>
    </div>
  )
}

