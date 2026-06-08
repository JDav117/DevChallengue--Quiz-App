import { useState, useCallback } from 'react'

const STORAGE_KEY = 'country-quiz-highscore'

export function useHighScore() {
  const [highScore, setHighScore] = useState<number>(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? parseInt(stored, 10) : 0
  })

  /** Guarda el puntaje si supera el récord actual. Retorna true si es nuevo récord. */
  const updateHighScore = useCallback(
    (score: number): boolean => {
      if (score > highScore) {
        setHighScore(score)
        localStorage.setItem(STORAGE_KEY, score.toString())
        return true
      }
      return false
    },
    [highScore],
  )

  return { highScore, updateHighScore }
}
