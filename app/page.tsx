'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { generateArticle } from './actions'

type Difficulty = 'Easy' | 'Normal' | 'Intermediate' | 'Difficult' | 'Challenging'
type Style = 'News like' | 'Blog like' | 'Essay like' | 'Story like' | 'Academic like' | 'Chat like'

interface HistoryItem {
  topic: string
  minWords: number
  maxWords: number
  difficulty: Difficulty
  style: Style
  english: string
  japanese: string
  timestamp: string
}

export default function ArticleGenerator() {
  const [topic, setTopic] = useState('')
  const [minWords, setMinWords] = useState(250)
  const [maxWords, setMaxWords] = useState(300)
  const [difficulty, setDifficulty] = useState<Difficulty>('Normal')
  const [style, setStyle] = useState<Style>('News like')
  const [article, setArticle] = useState({ english: '', japanese: '' })
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [history, setHistory] = useState<HistoryItem[]>([])

  const handleWordCountChange = (value: string, setter: (value: number) => void) => {
    const numValue = parseInt(value)
    if (!isNaN(numValue) && numValue >= 0) {
      setter(numValue)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (minWords > maxWords) {
      setError('最小語数は最大語数より小さい値を指定してください')
      return
    }
    if (minWords < 50 || maxWords > 1000) {
      setError('語数は50から1000の間で指定してください')
      return
    }
    setIsLoading(true)
    setError(null)
    const result = await generateArticle({ topic, minWords, maxWords, difficulty, style })
    setIsLoading(false)
    if (result.error) {
      setError(result.error)
    } else {
      setArticle({ english: result.english, japanese: result.japanese })
      setHistory(prev => [{
        topic,
        minWords,
        maxWords,
        difficulty,
        style,
        english: result.english,
        japanese: result.japanese,
        timestamp: new Date().toLocaleString('ja-JP')
      }, ...prev])
    }
  }

  const handleRegenerate = () => {
    handleSubmit(new Event('submit') as any)
  }

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>英語記事ジェネレーター</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="トピックを入力"
              required
            />
            <div className="flex items-center gap-2">
              <Input
                type="number"
                min={50}
                max={1000}
                value={minWords}
                onChange={(e) => handleWordCountChange(e.target.value, setMinWords)}
                className="w-24"
              />
              <span>-</span>
              <Input
                type="number"
                min={50}
                max={1000}
                value={maxWords}
                onChange={(e) => handleWordCountChange(e.target.value, setMaxWords)}
                className="w-24"
              />
              <span className="text-sm text-gray-500">words</span>
            </div>
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
            <Select value={style} onValueChange={(value: Style) => setStyle(value)}>
              <SelectTrigger>
                <SelectValue placeholder="スタイルを選択" />
              </SelectTrigger>
              <SelectContent>
                {['News like', 'Blog like', 'Essay like', 'Story like', 'Academic like', 'Chat like'].map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? '生成中...' : '記事を生成'}
            </Button>
          </form>

          {error && (
            <p className="text-red-500 mt-4">{error}</p>
          )}

          {article.english && (
            <div className="mt-6">
              <h2 className="text-lg font-semibold mb-2">生成された記事</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium">英語</h3>
                  <p className="whitespace-pre-wrap">{article.english}</p>
                </div>
                <div>
                  <h3 className="font-medium">日本語訳</h3>
                  <p className="whitespace-pre-wrap">{article.japanese}</p>
                </div>
              </div>
              <Button onClick={handleRegenerate} className="mt-4">
                再生成
              </Button>
            </div>
          )}

          {history.length > 0 && (
            <div className="mt-8">
              <h2 className="text-lg font-semibold mb-2">生成履歴</h2>
              <div className="space-y-6">
                {history.map((item, index) => (
                  <div key={index} className="border-t pt-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-medium">トピック {item.topic}</p>
                        <p className="text-sm text-gray-500">
                          {item.difficulty} / {item.style} / {item.minWords}-{item.maxWords} words
                        </p>
                      </div>
                      <p className="text-sm text-gray-500">{item.timestamp}</p>
                    </div>
                    <div className="space-y-2">
                      <p className="whitespace-pre-wrap">{item.english}</p>
                      <p className="text-gray-600 whitespace-pre-wrap">{item.japanese}</p>
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

