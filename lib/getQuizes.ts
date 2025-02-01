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

const getAllQuizes = (): {id: number, name: string, img: string, questions: Questions[] }[]  => {
  return [
    {
      id: 1,
      name: 'Javascript',
      img: '/javascriptbg.png',
      questions: javascriptQuiz
    },
    {
      id: 2,
      name: 'Typescript',
      img: '/typescriptbg.png',
      questions: typescriptQuiz
    },
    {
      id: 3,
      name : 'Python',
      img: '/pythonbg.png',
      questions: pythonQuiz
    }
  ]
  
}

export default getAllQuizes;