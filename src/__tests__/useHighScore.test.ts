import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, beforeEach } from 'vitest'
import { useHighScore } from '../hooks/useHighScore'

const STORAGE_KEY = 'country-quiz-highscore'

beforeEach(() => {
  localStorage.clear()
})

describe('useHighScore', () => {
  it('inicia con 0 cuando no hay nada en localStorage', () => {
    const { result } = renderHook(() => useHighScore())
    expect(result.current.highScore).toBe(0)
  })

  it('carga el puntaje guardado en localStorage al iniciar', () => {
    localStorage.setItem(STORAGE_KEY, '7')
    const { result } = renderHook(() => useHighScore())
    expect(result.current.highScore).toBe(7)
  })

  it('guarda un nuevo récord en localStorage cuando el puntaje es mayor', () => {
    const { result } = renderHook(() => useHighScore())
    act(() => {
      result.current.updateHighScore(8)
    })
    expect(result.current.highScore).toBe(8)
    expect(localStorage.getItem(STORAGE_KEY)).toBe('8')
  })

  it('no actualiza el récord si el puntaje es menor o igual', () => {
    localStorage.setItem(STORAGE_KEY, '9')
    const { result } = renderHook(() => useHighScore())
    act(() => {
      result.current.updateHighScore(5)
    })
    expect(result.current.highScore).toBe(9)
    expect(localStorage.getItem(STORAGE_KEY)).toBe('9')
  })
})
