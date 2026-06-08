import { useLocation, useNavigate } from 'react-router-dom'
import { DarkModeToggle } from '../components/DarkModeToggle'
import { useDarkMode } from '../hooks/useDarkMode'
import { useHighScore } from '../hooks/useHighScore'

interface ResultState {
  score: number
  total: number
  isNewRecord: boolean
}

export function Results() {
  const navigate = useNavigate()
  const location = useLocation()
  const { isDark, toggle } = useDarkMode()
  const { highScore } = useHighScore()

  const { score, total, isNewRecord } = (location.state as ResultState) ?? {
    score: 0,
    total: 10,
    isNewRecord: false,
  }

  const percentage = Math.round((score / total) * 100)

  function getEmoji() {
    if (percentage === 100) return '🏆'
    if (percentage >= 80) return '🌟'
    if (percentage >= 60) return '👍'
    if (percentage >= 40) return '📚'
    return '💪'
  }

  function getMessage() {
    if (percentage === 100) return '¡Perfecto! Conoces todas las capitales.'
    if (percentage >= 80) return '¡Excelente! Tienes un gran conocimiento geográfico.'
    if (percentage >= 60) return '¡Bien hecho! Sigue practicando.'
    if (percentage >= 40) return 'No está mal, pero aún hay margen de mejora.'
    return 'Sigue intentándolo, ¡cada juego te enseña algo nuevo!'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-900 dark:to-indigo-950 flex items-center justify-center p-4">
      <div className="absolute top-4 right-4">
        <DarkModeToggle isDark={isDark} onToggle={toggle} />
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 w-full max-w-md text-center">
        {/* Emoji resultado */}
        <div className="text-6xl mb-4">{getEmoji()}</div>

        {/* Nuevo récord */}
        {isNewRecord && (
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-xl px-4 py-2 mb-4 inline-block">
            <span className="text-yellow-700 dark:text-yellow-400 text-sm font-semibold">
              🎉 ¡Nuevo récord personal!
            </span>
          </div>
        )}

        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
          Resultado Final
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
          {getMessage()}
        </p>

        {/* Puntaje */}
        <div className="bg-indigo-50 dark:bg-indigo-900/30 rounded-2xl p-6 mb-6">
          <p className="text-5xl font-bold text-indigo-600 dark:text-indigo-400 mb-1">
            {score}
            <span className="text-2xl text-indigo-400 dark:text-indigo-500">
              /{total}
            </span>
          </p>
          <p className="text-sm text-indigo-500 dark:text-indigo-400">
            {percentage}% de respuestas correctas
          </p>
        </div>

        {/* Mejor racha */}
        <div className="flex items-center justify-between px-4 py-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl mb-6">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            🏆 Mejor racha histórica
          </span>
          <span className="font-bold text-gray-800 dark:text-gray-200">
            {highScore}
          </span>
        </div>

        {/* Botones */}
        <div className="flex flex-col gap-3">
          <button
            onClick={() => navigate('/quiz')}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition-colors"
          >
            Jugar de nuevo
          </button>
          <button
            onClick={() => navigate('/')}
            className="w-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 font-semibold py-3 rounded-xl transition-colors"
          >
            Volver al inicio
          </button>
        </div>
      </div>
    </div>
  )
}
