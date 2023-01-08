import { useState, useEffect, useReducer } from 'react'
import axios from 'axios'
import QuestionBox from './QuestionBox'
import QuestionReducer from './Reducers.js'
import Button from './Button.js'
import './App.css';

function App() {
  // set state variables
  const [score, setScore] = useState(0)
  const [questionNumber, setQuestionNumber] = useState(0)
  const [showResults, setShowResults] = useState(false)
  const [answers, setAnswers] = useState([])
  const [questions, dispatchQuestions] = useReducer(QuestionReducer,
    { data: [], isError: false, isLoading: false })

  // fetch api response
  const fetchQuestions = async () => {
    dispatchQuestions({ type: 'QUESTION_FETCH_INIT' })
    try {
      const response = await axios.get('https://opentdb.com/api.php?amount=10&category=11')

      return dispatchQuestions({ type: 'QUESTION_FETCH_SUCCESS', payload: [...response.data.results] })
    } catch (error) {
      return dispatchQuestions({ type: 'QUESTION_FETCH_FAIL' })
    }
  }

  useEffect(() => {
    setTimeout(() => {
      fetchQuestions();
    }, 3000)
  }, [])

  // take all answers (including the correct answer), throw them in an array,shuffle and set the state variable
  useEffect(() => {
    if (questionNumber === questions.data.length) {
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

  const handleAnswerClick = (isCorrect, current) => {
    if (isCorrect) {
      current.target.style.backgroundColor = "green"
      current.target.style.color = "white"
      setScore(score + 1)
    } else {
      current.target.style.backgroundColor = "red"
      current.target.style.color = "white"
    }
    setTimeout(() => {
      current.target.style.backgroundColor = "blanchedalmond"
      current.target.style.color = "black"
      setQuestionNumber(questionNumber + 1)
      if (questionNumber + 1 === questions.data.length) {
        setShowResults(true)
      }
    }, 1000)
  }
  // restart handler
  const restartGame = () => {
    setTimeout(() => {
      fetchQuestions();
      setQuestionNumber(0)
      setScore(0)
      setShowResults(false)
    }, 3000)
  }

  return (
    <div className="App">
      <div className='header-div'>
        {/* Header */}
        <h1 className='display-5 header'>Movie Trivia</h1>
        {/* Current Score */}
        <h5 className='score'>Current Score: {score}</h5>
      </div>
      {/* Question Card/Results */}
      <div className='card'>
        <>
          {questions.isLoading && <p className='text-warning'>Loading...</p>}
          {questions.isError && <p className='text-danger'>Something went wrong...</p>}
          {
            showResults ? (
              <div className='card-body results'>
                <h3 className='question'>You got {score} out of {questions.data.length} answers correct ({(score / questions.data.length) * 100}%)</h3>
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
        </>
      </div>
      <Button
        type='reset'
        value='reset'
        onClick={() => { restartGame() }}
      ><b>RESET</b>
      </Button>
    </div>
  );
}

export default App;
