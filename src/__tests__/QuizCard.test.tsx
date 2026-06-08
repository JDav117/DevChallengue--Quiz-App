import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { QuizCard } from '../components/QuizCard'
import type { Question } from '../types'

const mockQuestion: Question = {
  country: {
    name: { common: 'Francia', official: 'República Francesa' },
    capital: ['París'],
    flags: {
      png: 'https://flagcdn.com/w320/fr.png',
      svg: 'https://flagcdn.com/fr.svg',
      alt: 'Bandera de Francia',
    },
    region: 'Europe',
    cca2: 'FR',
  },
  options: ['París', 'Madrid', 'Roma', 'Berlín'],
  correct: 'París',
}

describe('QuizCard', () => {
  it('muestra el nombre del país en la pregunta', () => {
    render(
      <QuizCard
        question={mockQuestion}
        selectedAnswer={null}
        onAnswer={vi.fn()}
        disabled={false}
      />,
    )
    expect(screen.getByText('Francia')).toBeInTheDocument()
  })

  it('renderiza las 4 opciones de respuesta', () => {
    render(
      <QuizCard
        question={mockQuestion}
        selectedAnswer={null}
        onAnswer={vi.fn()}
        disabled={false}
      />,
    )
    expect(screen.getByText('París')).toBeInTheDocument()
    expect(screen.getByText('Madrid')).toBeInTheDocument()
    expect(screen.getByText('Roma')).toBeInTheDocument()
    expect(screen.getByText('Berlín')).toBeInTheDocument()
  })

  it('llama onAnswer con la opción seleccionada al hacer clic', async () => {
    const onAnswer = vi.fn()
    render(
      <QuizCard
        question={mockQuestion}
        selectedAnswer={null}
        onAnswer={onAnswer}
        disabled={false}
      />,
    )
    await userEvent.click(screen.getByText('Madrid'))
    expect(onAnswer).toHaveBeenCalledWith('Madrid')
  })

  it('deshabilita los botones cuando disabled es true', () => {
    render(
      <QuizCard
        question={mockQuestion}
        selectedAnswer="París"
        onAnswer={vi.fn()}
        disabled={true}
      />,
    )
    const buttons = screen.getAllByRole('button')
    buttons.forEach(btn => expect(btn).toBeDisabled())
  })
})
