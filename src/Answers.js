const Answers = function ({ id, answer, isCorrect }) {
	return (
		<li
			className='answer'
			key={id}
			iscorrect={isCorrect}
		>{answer}
		</li>
	)
}

export default Answers
