import { useRef } from 'react'

const Answers = function ({ id, answer, correct, onSubmit }) {
	const inputRef = useRef(null)

	const handleAnswerSubmissions = (inputRef) => {
		if (answer === correct) {
			onSubmit(true, inputRef)
		} else {
			onSubmit(false, inputRef)
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
