'use server'

import { generateText } from 'ai'
import { createGoogleGenerativeAI } from '@ai-sdk/google'

const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_API_KEY
})

type Difficulty = 'Easy' | 'Normal' | 'Intermediate' | 'Difficult' | 'Challenging'

interface GenerateSentencesParams {
  input: string
  difficulty: Difficulty
}

export async function generateSentences({ input, difficulty }: GenerateSentencesParams) {
  try {
    const difficultyLevels = {
      'Easy': '小学生向け',
      'Normal': '中学生〜高校生向け',
      'Intermediate': '高校生向け',
      'Difficult': '大学初級レベル',
      'Challenging': '大学中級レベル〜'
    }

    const prompt = `Generate 10 English sentences that include the word or phrase "${input}". 
    The difficulty level should be ${difficultyLevels[difficulty]}.
    After each English sentence, provide a Japanese translation.
    Format the output as follows:
    [ENGLISH]
    (English sentence here)
    [/ENGLISH]
    [JAPANESE]
    (Japanese translation here)
    [/JAPANESE]`

    const { text } = await generateText({
      model: google('gemini-1.5-pro'),
      prompt: prompt,
    })

    const sentences: { english: string, japanese: string }[] = []
    const englishMatches = text.match(/\[ENGLISH\]([\s\S]*?)\[\/ENGLISH\]/g)
    const japaneseMatches = text.match(/\[JAPANESE\]([\s\S]*?)\[\/JAPANESE\]/g)

    if (englishMatches && japaneseMatches && englishMatches.length === japaneseMatches.length) {
      for (let i = 0; i < englishMatches.length; i++) {
        const englishSentence = englishMatches[i].match(/\[ENGLISH\]([\s\S]*?)\[\/ENGLISH\]/)?.[1].trim() || ''
        const japaneseTranslation = japaneseMatches[i].match(/\[JAPANESE\]([\\s\S]*?)\[\/JAPANESE\]/)?.[1].trim() || ''
        sentences.push({ english: englishSentence, japanese: japaneseTranslation })
      }
    }

    return { sentences, error: null }
  } catch (error) {
    console.error('Error generating sentences:', error)
    return { sentences: [], error: 'Failed to generate sentences. Please try again.' }
  }
}
