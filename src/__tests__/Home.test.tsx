import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { Home } from '../pages/Home'

// Mock de hooks para aislar el componente
vi.mock('../hooks/useDarkMode', () => ({
  useDarkMode: () => ({ isDark: false, toggle: vi.fn() }),
}))

vi.mock('../hooks/useHighScore', () => ({
  useHighScore: () => ({ highScore: 0, updateHighScore: vi.fn() }),
}))

beforeEach(() => {
  localStorage.clear()
})

describe('Home', () => {
  it('renderiza el título Country Quiz', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    )
    expect(screen.getByText('Country Quiz')).toBeInTheDocument()
  })

  it('muestra el botón para comenzar el quiz', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    )
    expect(
      screen.getByRole('button', { name: /comenzar quiz/i }),
    ).toBeInTheDocument()
  })

  it('muestra las reglas del juego', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    )
    expect(screen.getByText(/15 segundos por pregunta/i)).toBeInTheDocument()
  })

  it('no muestra el panel de racha cuando highScore es 0', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    )
    expect(screen.queryByText(/Mejor racha/i)).not.toBeInTheDocument()
  })
})
