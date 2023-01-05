import { useState, useEffect, useReducer } from 'react'
import QuestionBox from './QuestionBox'
import QuestionReducer from './Reducers.js'
import './App.css';

function App() {
  const [score, setScore] = useState(0)
  const [questionNumber, setQuestionNumber] = useState(0)
  const [showResults, setShowResults] = useState(false)
  const [answers, setAnswers] = useState([])
  const [questions, dispatchQuestions] = useReducer(QuestionReducer,
    { data: [], isError: false, isLoading: false })

  const fetchQuestions = async () => {
    try {
      dispatchQuestions({ type: 'QUESTION_FETCH_INIT' })

      const response = await fetch('https://opentdb.com/api.php?amount=15&category=11')

      const data = await response.json()

      return dispatchQuestions({ type: 'QUESTION_FETCH_SUCCESS', payload: [...data.results] })
    } catch (error) {
      return dispatchQuestions({ type: 'QUESTION_FETCH_FAIL' })
    }
  }

  useEffect(() => {
    setTimeout(() => {
      fetchQuestions();
    }, 3000)
  }, [])

  useEffect(() => {
    console.log(questions)
    if (questions.data.length === 0) {
      return
    }

    const allAnswers = questions.data[questionNumber].incorrect_answers
    
    if (allAnswers.length < 4) {
      allAnswers.push(questions.data[questionNumber].correct_answer)
    }
    
    if (allAnswers.length > 4) {
      allAnswers.slice(0, 4)
    }
    
    const shuffledArray = allAnswers.sort((a, b) => 0.5 - Math.random());
    
    setAnswers(shuffledArray)
  }, [questionNumber, questions.data])

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
    if (questionNumber + 1 === questions.data.length) {
      setShowResults(true)
    } else {
      setQuestionNumber(questionNumber + 1)
    }
  }

  return (
    <div className="App">
      {/* Header */}
      <h1 className='display-5 header'>Movie Trivia</h1>
      {/* Current Score */}
      <h5 className='score'>Current Score: {score}</h5>
      {/* Question Card/Results */}
      <div className='card'>
        <div className='card-body'>
          <>
            {questions.isLoading && <p>Loading...</p>}
            {questions.isError && <p>Something went wrong...</p>}
            {
              showResults ? (
                <div className='card-body results'>
                  <h3 className='question'>You got {score} out of {questions.data.length} answers correct</h3>
                </div>
              ) : (
                questions.data.length > 0 ? (
                  <div className='card-body'>
                    <QuestionBox
                      questions={questions}
                      questionNumber={questionNumber}
                      answers={answers}
                      handleAnswerClick={handleAnswerClick}
                    ></QuestionBox>
                  </div>
                ) : (
                  <p className='text-warning'>Loading...</p>
                )
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
