import { useState, useEffect } from 'react'
import Answers from './Answers.js'
import Questions from './Questions.js'
import './App.css';

function App() {
  const [score, setScore] = useState(0)
  const [questionNumber, setQuestionNumber] = useState(0)
  const [showResults, setShowResults] = useState(false)
  const [questions, setQuestions] = useState([])

  const fetchQuestions = async () => {
    const response = await fetch('https://opentdb.com/api.php?amount=10&category=23&difficulty=easy&type=multiple')

    const data = await response.json()

    const questionWrapper = [data.results]

    setQuestions(questionWrapper)
  }

  useEffect(() => {
    fetchQuestions();
  }, [])

  const restartGame = () => {
    setQuestionNumber(0)
    setScore(0)
    setShowResults(false)
  }

  const handleAnswerClick = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1)
    }
    if (questionNumber + 1 === questions.length) {
      setShowResults(true)
    } else {
      setQuestionNumber(questionNumber + 1)
    }
  }

  // if (questions.length === 0) {
  //   setQuestions(Questions)
  //   console.log(questions)
  // }

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
            {
              showResults ? (
                <div className='card-body results'>
                  <h3 className='question'>You got {score} out of {questions.length} answers correct</h3>
                </div>
              ) : (
                <div className='card-body'>
                  <h3 className='question'>Question {questionNumber + 1} out of {questions.length}</h3>
                  <h5 className='card-title card-text'>{questions[questionNumber].question}</h5>
                  {/* { questions[questionNumber].incorrect_answers << questions[questionNumber].correct_answer } */}
                  <ul>
                    {
                      questions[questionNumber].incorrect_answers.map((option, index) => {
                        return (
                          <Answers
                            key={index}
                            answer={option}
                            onSubmit={handleAnswerClick}
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
            >Restart
            </button>
          </>
        </div>
      </div>
    </div>
  );
}

export default App;
