interface TimerProps {
  timeLeft: number
  total: number
}

export function Timer({ timeLeft, total }: TimerProps) {
  const percentage = (timeLeft / total) * 100
  const isUrgent = timeLeft <= 5

  return (
    <div className="w-full" data-testid="timer">
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
          Tiempo restante
        </span>
        <span
          className={`text-sm font-bold tabular-nums transition-colors ${
            isUrgent
              ? 'text-red-500 animate-pulse'
              : 'text-indigo-600 dark:text-indigo-400'
          }`}
        >
          {timeLeft}s
        </span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
        <div
          className={`h-2 rounded-full transition-all duration-1000 ${
            isUrgent ? 'bg-red-500' : 'bg-indigo-500'
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}
