import type { Country, Question } from '../types'

const API_URL =
  'https://restcountries.com/v3.1/all?fields=name,capital,flags,region,cca2'

export async function fetchCountries(): Promise<Country[]> {
  const response = await fetch(API_URL)
  if (!response.ok) {
    throw new Error(`Error al obtener países: ${response.status}`)
  }
  const data: Country[] = await response.json()
  return data.filter(c => c.capital && c.capital.length > 0 && c.capital[0])
}

function shuffle<T>(array: T[]): T[] {
  return [...array].sort(() => Math.random() - 0.5)
}

export function generateQuestions(countries: Country[], count = 10): Question[] {
  const valid = countries.filter(c => c.capital?.[0])
  const selected = shuffle(valid).slice(0, count)

  return selected.map(country => {
    const correct = country.capital[0]

    const wrongPool = valid.filter(
      c => c.cca2 !== country.cca2 && c.capital[0] !== correct,
    )

    const wrongOptions = shuffle(wrongPool)
      .slice(0, 3)
      .map(c => c.capital[0])

    const options = shuffle([correct, ...wrongOptions])

    return { country, options, correct }
  })
}
