import Answers from './Answers'

const QuestionBox = ({ questions, questionNumber, answers, handleAnswerClick }) => {
  const stringFormatter = (str) => {
    let string = str.replace(/&quot;/g, '"')
    string = string.replace(/&#039;/g, '\'')
    string = string.replace(/&amp;/g, '&')
	string = string.replace(/&ldquo;/g, '"')
	string = string.replace(/&rdquo;/g, '"\'"')
	string = string.replace(/&hellip;/g, '...')
  
    return string
  }

	return (
		<>
			<h3 className='question'>Question {questionNumber + 1} out of {questions.data.length}</h3>
			<h5 className='card-title card-text'>{stringFormatter(questions.data[questionNumber].question)}</h5>
			<ul>
				{
					answers.map((option, index) => {
						return (
							<Answers
								key={index}
								answer={stringFormatter(option)}
								onSubmit={handleAnswerClick}
								correct={stringFormatter(questions.data[questionNumber].correct_answer)}
							></Answers>
						)
					})
				}
			</ul>
		</>
	)
}

export default QuestionBox
