import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Timer } from '../components/Timer'

describe('Timer', () => {
  it('muestra los segundos restantes correctamente', () => {
    render(<Timer timeLeft={15} total={15} />)
    expect(screen.getByText('15s')).toBeInTheDocument()
  })

  it('muestra el texto "Tiempo restante"', () => {
    render(<Timer timeLeft={10} total={15} />)
    expect(screen.getByText(/tiempo restante/i)).toBeInTheDocument()
  })

  it('aplica clase de urgencia cuando quedan 5 segundos o menos', () => {
    render(<Timer timeLeft={3} total={15} />)
    // El span del tiempo debe tener la clase de color rojo
    const timeSpan = screen.getByText('3s')
    expect(timeSpan).toHaveClass('text-red-500')
  })

  it('no aplica clase de urgencia cuando hay tiempo suficiente', () => {
    render(<Timer timeLeft={10} total={15} />)
    const timeSpan = screen.getByText('10s')
    expect(timeSpan).not.toHaveClass('text-red-500')
  })
})

// Silenciar advertencias de act() en este test
vi.stubGlobal('IS_REACT_ACT_ENVIRONMENT', true)
