import type { Question } from '../types'

interface QuizCardProps {
  question: Question
  selectedAnswer: string | null
  onAnswer: (answer: string) => void
  disabled: boolean
}

const LABELS = ['A', 'B', 'C', 'D']

export function QuizCard({
  question,
  selectedAnswer,
  onAnswer,
  disabled,
}: QuizCardProps) {
  function getStyle(option: string): string {
    const base =
      'w-full text-left px-4 py-3 rounded-xl border-2 font-medium text-sm transition-all duration-200 disabled:cursor-not-allowed flex items-center gap-3'

    if (!selectedAnswer) {
      return `${base} border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:border-indigo-400 dark:hover:border-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-900/20`
    }
    if (option === question.correct) {
      return `${base} border-green-500 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300`
    }
    if (option === selectedAnswer && option !== question.correct) {
      return `${base} border-red-500 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300`
    }
    return `${base} border-gray-200 dark:border-gray-700 text-gray-400 dark:text-gray-500 opacity-60`
  }

  return (
    <div className="w-full" data-testid="quiz-card">
      {/* Bandera */}
      <div className="flex justify-center mb-5">
        <img
          src={question.country.flags.png}
          alt={
            question.country.flags.alt ??
            `Bandera de ${question.country.name.common}`
          }
          className="w-36 h-24 object-cover rounded-lg shadow-md"
        />
      </div>

      {/* Pregunta */}
      <h2 className="text-base font-semibold text-center text-gray-800 dark:text-gray-100 mb-5 leading-snug">
        ¿Cuál es la capital de{' '}
        <span className="text-indigo-600 dark:text-indigo-400">
          {question.country.name.common}
        </span>
        ?
      </h2>

      {/* Opciones */}
      <div className="flex flex-col gap-2.5">
        {question.options.map((option, i) => (
          <button
            key={option}
            onClick={() => onAnswer(option)}
            disabled={disabled}
            className={getStyle(option)}
          >
            <span className="inline-flex items-center justify-center w-6 h-6 text-xs bg-gray-100 dark:bg-gray-700 rounded-full shrink-0 font-semibold">
              {LABELS[i]}
            </span>
            {option}
          </button>
        ))}
      </div>
    </div>
  )
}
