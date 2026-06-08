import { useNavigate } from 'react-router-dom'
import { DarkModeToggle } from '../components/DarkModeToggle'
import { useDarkMode } from '../hooks/useDarkMode'
import { useHighScore } from '../hooks/useHighScore'

export function Home() {
  const navigate = useNavigate()
  const { isDark, toggle } = useDarkMode()
  const { highScore } = useHighScore()

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-900 dark:to-indigo-950 flex items-center justify-center p-4">
      {/* Toggle dark mode */}
      <div className="absolute top-4 right-4">
        <DarkModeToggle isDark={isDark} onToggle={toggle} />
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 w-full max-w-md text-center">
        {/* Ícono */}
        <div className="text-6xl mb-4 animate-spin-slow">🌍</div>

        {/* Título */}
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Country Quiz
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mb-6 text-sm">
          ¿Cuánto sabes sobre las capitales del mundo?
        </p>

        {/* Racha máxima */}
        {highScore > 0 && (
          <div className="bg-indigo-50 dark:bg-indigo-900/30 rounded-xl px-4 py-3 mb-6 flex items-center justify-between">
            <span className="text-sm text-indigo-600 dark:text-indigo-400 font-medium">
              🏆 Mejor racha
            </span>
            <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
              {highScore}
            </span>
          </div>
        )}

        {/* Reglas */}
        <div className="text-left mb-6 space-y-2">
          {[
            { icon: '⏱️', text: '15 segundos por pregunta' },
            { icon: '🎯', text: '10 preguntas de capitales del mundo' },
            { icon: '🏅', text: 'Tu mejor racha se guarda automáticamente' },
            { icon: '🔊', text: 'Efectos de sonido en cada respuesta' },
          ].map(({ icon, text }) => (
            <div
              key={text}
              className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400"
            >
              <span>{icon}</span>
              <span>{text}</span>
            </div>
          ))}
        </div>

        {/* Botón */}
        <button
          onClick={() => navigate('/quiz')}
          className="w-full bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-semibold py-3.5 rounded-xl transition-colors text-base"
        >
          Comenzar Quiz
        </button>
      </div>
    </div>
  )
}
