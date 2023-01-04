import { useState, useEffect } from 'react'
import Answers from './Answers.js'
import Questions from './Questions.js'
import './App.css';

function App() {
  const [score, setScore] = useState(0)
  const [questionNumber, setQuestionNumber] = useState(0)
  const [showResults, setShowResults] = useState(false)

  useEffect(() => {

  }, [])

  const restartGame = () => {
    setQuestionNumber(0)
    setScore(0)
    setShowResults(false)
  }

  const handleAnswerClick = (isCorrect) => {
    console.log('length', Questions.length, 'number', questionNumber, 'correct?', isCorrect)
    if (isCorrect) {
      setScore(score + 1)
    }
    if (questionNumber + 1 === Questions.length) {
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
            {
              showResults ? (
                <div className='card-body results'>
                  <h3 className='question'>You got {score} out of {Questions.length} answers correct</h3>
                </div>
              ) : (
                <div className='card-body'>
                  <h3 className='question'>Question {questionNumber + 1} out of {Questions.length}</h3>
                  <h5 className='card-title card-text'>{Questions[questionNumber].question}</h5>
                  <ul>
                    {Questions[questionNumber].options.map((option) => {
                      return (
                        <Answers
                          key={option.id}
                          answer={option.text}
                          isCorrect={option.isCorrect}
                          onSubmit={handleAnswerClick}
                        ></Answers>
                      )
                    })}
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
