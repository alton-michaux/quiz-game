import { useState, useEffect, useReducer } from 'react'
import Answers from './Answers.js'
import Questions from './Questions.js'
import './App.css';

const QuestionReducer = (state, action) => {
  switch (action.type) {
    case 'QUESTION_FETCH_INIT':
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case 'QUESTION_FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    case 'QUESTION_FETCH_FAIL':
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    default:
      return {
        ...state,
        isLoading: false,
        isError: false,
      };
  }
}

function App() {
  const [score, setScore] = useState(0)
  const [questionNumber, setQuestionNumber] = useState(0)
  const [showResults, setShowResults] = useState(false)
  const [questions, dispatchQuestions] = useReducer(QuestionReducer,
    { data: [], isError: false, isLoading: false })
  const [answers, setAnswers] = useState([])

  const fetchQuestions = async () => {
    try {
      dispatchQuestions({ type: 'QUESTION_FETCH_INIT' })

      const response = await fetch('https://opentdb.com/api.php?amount=10&category=23&difficulty=easy&type=multiple')

      const data = await response.json()

      return dispatchQuestions({ type: 'QUESTION_FETCH_SUCCESS', payload: [...data.results] })
    } catch (error) {
      return dispatchQuestions({ type: 'QUESTION_FETCH_FAIL' })
    }
  }

  useEffect(() => {
    const allAnswers = Questions.data[questionNumber].incorrect_answers
    
    if (allAnswers.length < 4) {
      allAnswers.push(Questions.data[questionNumber].correct_answer)
    }
    
    if (allAnswers.length > 4) {
      allAnswers.slice(0, 4)
    }
    
    const shuffledArray = allAnswers.sort((a, b) => 0.5 - Math.random());
    
    setAnswers(shuffledArray)
  }, [questionNumber])

  const restartGame = () => {
    setTimeout(() => {
      fetchQuestions();
      setQuestionNumber(0)
      setScore(0)
      setShowResults(false)
    }, 3000)
  }

  const handleAnswerClick = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1)
    }
    if (questionNumber + 1 === Questions.data.length) {
      setShowResults(true)
    } else {
      setQuestionNumber(questionNumber + 1)
    }
  }

  return (
    <div className="App">
      {/* Header */}
      <h1 className='display-3 header'>Drunk History Trivia</h1>
      {/* Current Score */}
      <p className='score'>Current Score: {score}</p>
      {/* Question Card/Results */}
      <div className='card'>
        <div className='card-body'>
          <>
            {questions.isLoading && <p>Loading...</p>}
            {questions.isError && <p>Something went wrong...</p>}
            {
              showResults ? (
                <div className='card-body results'>
                  <h3 className='question'>You got {score} out of {Questions.data.length} answers correct</h3>
                </div>
              ) : (
                <div className='card-body'>
                  <h3 className='question'>Question {questionNumber + 1} out of {Questions.data.length}</h3>
                  <h5 className='card-title card-text'>{Questions.data[questionNumber].question}</h5>
                  <ul>
                    {
                      answers.map((option, index) => {
                        return (
                          <Answers
                            key={index}
                            answer={option}
                            onSubmit={handleAnswerClick}
                            correct={Questions.data[questionNumber].correct_answer}
                          ></Answers>
                        )
                      })
                    }
                  </ul>
                </div>
              )
            }
            <button
              type='button'
              onClick={() => { restartGame() }}
            >New Game
            </button>
          </>
        </div>
      </div>
    </div>
  );
}

export default App;
