export type Questions = {
  id: number,
  question: string,
  options: Option[]
}

export type Option = {
  id: number,
  label: string,
  text: string,
  isCorrect: boolean
}

