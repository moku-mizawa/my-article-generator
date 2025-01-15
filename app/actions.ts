'use server'

import { generateText } from 'ai'
import { createGoogleGenerativeAI } from '@ai-sdk/google'

const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_API_KEY
})

type Difficulty = 'Easy' | 'Normal' | 'Intermediate' | 'Difficult' | 'Challenging'
type Style = 'News like' | 'Blog like' | 'Essay like' | 'Story like' | 'Academic like' | 'Chat like' | 'Explanation like'

interface GenerateArticleParams {
  topic: string
  minWords: number
  maxWords: number
  difficulty: Difficulty
  style: Style
}

export async function generateArticle({ topic, minWords, maxWords, difficulty, style }: GenerateArticleParams) {
  try {
    const difficultyLevels = {
      'Easy': '小学生向け',
      'Normal': '中学生〜高校生向け',
      'Intermediate': '高校生向け',
      'Difficult': '大学初級レベル',
      'Challenging': '大学中級レベル〜'
    }

    const styleDescriptions = {
      'News like': 'ニュース記事のように事実にフォーカスする',
      'Blog like': 'ブログ記事のように事実とその感想にフォーカスする',
      'Essay like': 'トピックについて議論する',
      'Story like': 'トピックに基づいた物語を生成する',
      'Academic like': '論文のように事実を述べる',
      'Chat like': '特定の人物間での会話のような文章',
      'Explanation like': 'トピックについて説明する'
    }

    const prompt = `Generate an English article on the topic "${topic}". 
    The article should be between ${minWords} and ${maxWords} words.
    The article should be no more than 2 paragraphs.
    The difficulty level should be ${difficultyLevels[difficulty]}.
    The style should be ${styleDescriptions[style]}.
    Vocabulary used in sentences should be somewhat formal.
    After the English article, provide a Japanese translation of the entire article.
    Format the output as follows:
    [ENGLISH]
    (English article here)
    [/ENGLISH]
    [JAPANESE]
    (Japanese translation here)
    [/JAPANESE]`

    const { text } = await generateText({
      model: google('gemini-1.5-pro'),
      prompt: prompt,
    })

    const englishMatch = text.match(/\[ENGLISH\]([\s\S]*?)\[\/ENGLISH\]/);
    const japaneseMatch = text.match(/\[JAPANESE\]([\s\S]*?)\[\/JAPANESE\]/);

    const englishArticle = englishMatch ? englishMatch[1].trim() : '';
    const japaneseTranslation = japaneseMatch ? japaneseMatch[1].trim() : '';

    return { 
      english: englishArticle, 
      japanese: japaneseTranslation, 
      error: null 
    }
  } catch (error) {
    console.error('Error generating article:', error)
    return { english: '', japanese: '', error: 'Failed to generate article. Please try again.' }
  }
}

