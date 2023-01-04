const Answers = function ({ id, answer, isCorrect, onSubmit }) {
	const handleAnswerSubmissions = () => {
		onSubmit(isCorrect)
	}
	return (
		<li
			className='answer'
			key={id}
			onClick={handleAnswerSubmissions}
		>{answer}
		</li>
	)
}

export default Answers
