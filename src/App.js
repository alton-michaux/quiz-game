import { useState, useEffect } from 'react'
import Answers from './Answers.js'
import Questions from './Questions.js'
import './App.css';

function App() {
  const [score, setScore] = useState(0)
  const [questionNumber, setQuestionNumber] = useState(0)
  const [showResults, setShowResults] = useState(false)
  const [questions, setQuestions] = useState([])
  // const [isLoading, setIsLoading] = useState(false)
  // const [isError, setIsError] = useState(false)

  const fetchQuestions = async () => {
    try {
      const response = await fetch('https://opentdb.com/api.php?amount=10&category=23&difficulty=easy&type=multiple')
      
      const data = await response.json()
      
      return setQuestions([...data.results])
    } catch (error) {
      // setIsError(true)
      console.log(error)
    }
  }

  useEffect(() => {
    // setIsLoading(true)

    setTimeout(() => {
      fetchQuestions();
      console.log('questions', questions)
    }, 3000)

    // setIsLoading(false)
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
    if (questionNumber + 1 === Questions.length) {
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
            {/* {isLoading && <p>Loading...</p>}
            {isError && <p>Something went wrong...</p>} */}
            {
              showResults ? (
                <div className='card-body results'>
                  <h3 className='question'>You got {score} out of {Questions.length} answers correct</h3>
                </div>
              ) : (
                <div className='card-body'>
                  <h3 className='question'>Question {questionNumber + 1} out of {Questions.length}</h3>
                  <h5 className='card-title card-text'>{Questions[questionNumber].question}</h5>
                  {/* { questions[questionNumber].incorrect_answers << questions[questionNumber].correct_answer } */}
                  <ul>
                    {
                      Questions[questionNumber].incorrect_answers.map((option, index) => {
                        return (
                          <Answers
                            key={option.id}
                            answer={option.text}
                            isCorrect={option.isCorrect}
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
