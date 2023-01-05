const Answers = function ({ id, answer, correct, onSubmit }) {
	const handleAnswerSubmissions = () => {
		if (answer === correct) {
			onSubmit(true)
		} else {
			onSubmit(false)
		}
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
