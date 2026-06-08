import { useState, useEffect, useRef } from 'react'

/**
 * Temporizador regresivo.
 * @param initialSeconds - Segundos de inicio (ej. 15)
 * @param key - Cambiar este valor reinicia el temporizador
 * @param onExpire - Callback que se ejecuta cuando llega a 0
 * @returns timeLeft - segundos restantes
 */
export function useTimer(
  initialSeconds: number,
  key: number,
  onExpire: () => void,
): number {
  const [timeLeft, setTimeLeft] = useState(initialSeconds)
  const onExpireRef = useRef(onExpire)

  // Mantener siempre la referencia actualizada
  useEffect(() => {
    onExpireRef.current = onExpire
  })

  // Reiniciar cuando cambia la key
  useEffect(() => {
    setTimeLeft(initialSeconds)
  }, [key, initialSeconds])

  // Cuenta regresiva
  useEffect(() => {
    if (timeLeft <= 0) {
      onExpireRef.current()
      return
    }
    const id = setTimeout(() => setTimeLeft(t => t - 1), 1000)
    return () => clearTimeout(id)
  }, [timeLeft])

  return timeLeft
}
