import javascriptQuiz from '../data/javascriptQuiz.json'
import typescriptQuiz from '../data/typescriptQuiz.json'
import pythonQuiz from '../data/pythonQuiz.json'
import type { Questions }  from './types/questionType'

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