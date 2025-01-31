import javascriptQuiz from '../data/javascriptQuiz.json'
import typescriptQuiz from '../data/typescriptQuiz.json'
import pythonQuiz from '../data/pythonQuiz.json'

type Questions = {
  id: number,
  question: string,
  options: {
    id: number,
    label: string,
    text: string,
    isCorrect: boolean
  }[]
}

const getAllQuizes = (): {id: number, name: string, questions: Questions[] }[]  => {
  return [
    {
      id: 1,
      name: 'Javascript',
      questions: javascriptQuiz
    },
    {
      id: 2,
      name: 'Typescript',
      questions: typescriptQuiz
    },
    {
      id: 3,
      name : 'Python',
      questions: pythonQuiz
    }
  ]
  
}

export default getAllQuizes;