export async function shuffleSentences(input: string) {
    try {
      // 文末の"."を除去
      const sanitizedInput = input.endsWith('.') ? input.slice(0, -1) : input;
      // 先頭の大文字を小文字に変換し、"I"のみ大文字のままにする
      const words = sanitizedInput.split(' ').map(word => {
        if (word === 'I') return word;
        return word.toLowerCase();
      });
  
      const sentences: string[][] = [];
  
      for (let i = 0; i < 5; i++) {
        const shuffled = [...words].sort(() => Math.random() - 0.5);
        sentences.push(shuffled);
      }
  
      return { sentences, error: null };
    } catch (error) {
      console.error('Error shuffling sentences:', error);
      return { sentences: [], error: 'Failed to shuffle sentences. Please try again.' };
    }
  }