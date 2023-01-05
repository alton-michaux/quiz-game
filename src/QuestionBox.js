import Answers from './Answers'
import App from './App'

const QuestionBox = ({ questions, questionNumber, answers, handleAnswerClick }) => {
	return (
		<>
			<h3 className='question'>Question {questionNumber + 1} out of {questions.data.length}</h3>
			<h5 className='card-title card-text'>{App.stringFormatter(questions.data[questionNumber].question)}</h5>
			<ul>
				{
					answers.map((option, index) => {
						return (
							<Answers
								key={index}
								answer={App.stringFormatter(option)}
								onSubmit={handleAnswerClick}
								correct={App.stringFormatter(questions.data[questionNumber].correct_answer)}
							></Answers>
						)
					})
				}
			</ul>
		</>
	)
}

export default QuestionBox
