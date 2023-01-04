import { useState } from 'react'
import Answers from './Answers.js'
import './App.css';

function App() {
  const [score, setScore] = useState(0)
  const [questionNumber, setQuestionNumber] = useState(0)
  const [showResults, setShowResults] = useState(false)

  const questions = [
    {
      question: 'Napoleon was once attacked by a horde of _____.',
      options: [
        { id: 1, text: 'Dogs', isCorrect: false },
        { id: 2, text: 'Ferrets', isCorrect: false },
        { id: 3, text: 'Rabbits', isCorrect: true },
        { id: 4, text: 'Pigeons', isCorrect: false }
      ]
    }
  ]

  return (
    <div className="App">
      {/* Header */}
      <h1 className='display-3 header'>Drunk History Trivia</h1>
      {/* Current Score */}
      <p className='score'>Current Score: {score}</p>
      {/* Question Card/Results */}
      <div className='card'>
        <div className='card-body'>
          {
            showResults ? (
              <div className='card-body results'>
                <h3 className='question'>You got {score} out of 5 answers correct</h3>
              </div>
            ) : (
              <div className='card-body'>
                <h3 className='question'>Question {questionNumber + 1} out of 5</h3>
                <h5 className='card-title card-text'>{questions[questionNumber].question}</h5>
                <ul>
                  {questions[questionNumber].options.map((option) => {
                    return (
                      <Answers
                        key={option.id}
                        answer={option.text}
                        iscorrect={option.isCorrect}
                      ></Answers>
                    )
                  })}
                </ul>
              </div>
            )
          }
        </div>
      </div>
    </div>
  );
}

export default App;
