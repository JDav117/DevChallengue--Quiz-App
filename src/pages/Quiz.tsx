import { useState, useEffect, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import type { Question } from '../types'
import { fetchCountries, generateQuestions } from '../services/countries'
import { playCorrectSound, playWrongSound } from '../utils/audio'
import { useHighScore } from '../hooks/useHighScore'
import { useDarkMode } from '../hooks/useDarkMode'
import { useTimer } from '../hooks/useTimer'
import { QuizCard } from '../components/QuizCard'
import { Timer } from '../components/Timer'
import { ProgressBar } from '../components/ProgressBar'
import { DarkModeToggle } from '../components/DarkModeToggle'

const TOTAL = 10
const SECONDS = 15

export function Quiz() {
  const navigate = useNavigate()
  const { isDark, toggle } = useDarkMode()
  const { updateHighScore } = useHighScore()

  const [questions, setQuestions] = useState<Question[]>([])
  const [index, setIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [timerKey, setTimerKey] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Refs para evitar closures obsoletos en callbacks asíncronos
  const indexRef = useRef(0)
  const scoreRef = useRef(0)
  const selectedAnswerRef = useRef<string | null>(null)
  const questionsRef = useRef<Question[]>([])

  useEffect(() => { indexRef.current = index }, [index])
  useEffect(() => { selectedAnswerRef.current = selectedAnswer }, [selectedAnswer])
  useEffect(() => { questionsRef.current = questions }, [questions])

  // advance: pasa a la siguiente pregunta o va a resultados
  const advance = useCallback(() => {
    const nextIndex = indexRef.current + 1
    if (nextIndex >= TOTAL) {
      const isNewRecord = updateHighScore(scoreRef.current)
      navigate('/results', {
        state: { score: scoreRef.current, total: TOTAL, isNewRecord },
      })
    } else {
      setIndex(nextIndex)
      setSelectedAnswer(null)
      setTimerKey(k => k + 1)
    }
  }, [navigate, updateHighScore])

  // handleAnswer: procesa la respuesta del usuario
  const handleAnswer = useCallback(
    (option: string) => {
      if (selectedAnswerRef.current !== null) return

      setSelectedAnswer(option)

      const isCorrect =
        option === questionsRef.current[indexRef.current]?.correct

      if (isCorrect) {
        playCorrectSound()
        const newScore = scoreRef.current + 1
        scoreRef.current = newScore
        setScore(newScore)
      } else {
        playWrongSound()
      }

      setTimeout(advance, 1500)
    },
    [advance],
  )

  // handleExpire: tiempo agotado sin respuesta
  const handleExpire = useCallback(() => {
    if (selectedAnswerRef.current !== null) return
    playWrongSound()
    setSelectedAnswer('__timeout__')
    setTimeout(advance, 1500)
  }, [advance])

  const timeLeft = useTimer(SECONDS, timerKey, handleExpire)

  // Cargar países al montar
  useEffect(() => {
    fetchCountries()
      .then(countries => {
        const qs = generateQuestions(countries, TOTAL)
        setQuestions(qs)
        questionsRef.current = qs
        setLoading(false)
      })
      .catch(() => {
        setError('No se pudieron cargar los países. Verifica tu conexión.')
        setLoading(false)
      })
  }, [])

  // ── Pantalla de carga ──────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-900 dark:to-indigo-950 flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl mb-4 animate-spin-slow">🌍</div>
          <p className="text-gray-600 dark:text-gray-400 font-medium">
            Cargando países del mundo...
          </p>
        </div>
      </div>
    )
  }

  // ── Pantalla de error ──────────────────────────────────────────────────────
  if (error || questions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-900 dark:to-indigo-950 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 text-center max-w-sm shadow-xl">
          <div className="text-4xl mb-4">❌</div>
          <p className="text-red-600 dark:text-red-400 mb-4 font-medium">
            {error ?? 'No se encontraron preguntas'}
          </p>
          <button
            onClick={() => navigate('/')}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2.5 rounded-xl transition-colors"
          >
            Volver al inicio
          </button>
        </div>
      </div>
    )
  }

  const currentQuestion = questions[index]

  // ── Juego ──────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-900 dark:to-indigo-950 flex items-center justify-center p-4">
      {/* Header */}
      <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
        <span className="text-sm font-semibold bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 px-3 py-1 rounded-full">
          ⭐ {score} / {TOTAL}
        </span>
        <DarkModeToggle isDark={isDark} onToggle={toggle} />
      </div>

      {/* Tarjeta principal */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 w-full max-w-md">
        <div className="mb-4">
          <ProgressBar current={index + 1} total={TOTAL} />
        </div>
        <div className="mb-5">
          <Timer timeLeft={timeLeft} total={SECONDS} />
        </div>
        <QuizCard
          question={currentQuestion}
          selectedAnswer={selectedAnswer}
          onAnswer={handleAnswer}
          disabled={selectedAnswer !== null}
        />
      </div>
    </div>
  )
}
