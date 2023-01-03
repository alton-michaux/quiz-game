import {useState} from 'react'
import './App.css';

function App() {
  const [score, setScore] = useState(0)
  const [questionNumber, setQuestionNumber] = useState(1)
  const [isCorrect, setIsCorrect] = useState(false)

  return (
    <div className="App">
      {/* Header */}
      <h1 className='display-3 header'>Drunk History Trivia</h1>
      {/* Current Score */}
      <p className='score'>Current Score: {score}</p>
      {/* Question Card */}
      <div className='card'>
        <div className='card-body'>
          <h3 className='question'>Question {questionNumber} out of 5</h3>
          <h5 className='card-title card-text'>Join the expedition as these intrepid explorers venture into the Western Frontier, as told by Georgia Hardstark and Alie Ward. Name the dynamic duo.</h5>
          <ul>
            <li className='answers'>Butch Cassidy and the Sundance Kid</li>
            <li className='answers'>Starsky and Hutch</li>
            <li className='answers'>Lewis and Clark</li>
            <li className='answers'>Sherlock Holmes and Dr. Watson</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
