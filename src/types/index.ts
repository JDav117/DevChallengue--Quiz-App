export interface Country {
  name: {
    common: string
    official: string
  }
  capital: string[]
  flags: {
    png: string
    svg: string
    alt?: string
  }
  region: string
  cca2: string
}

export interface Question {
  country: Country
  options: string[]
  correct: string
}
