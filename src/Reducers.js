const QuestionReducer = (state, action) => {
	switch (action.type) {
		case 'QUESTION_FETCH_INIT':
			return {
				...state,
				isLoading: true,
				isError: false,
			};
		case 'QUESTION_FETCH_SUCCESS':
			return {
				...state,
				isLoading: false,
				isError: false,
				data: action.payload,
			};
		case 'QUESTION_FETCH_FAIL':
			return {
				...state,
				isLoading: false,
				isError: true,
			};
		default:
			return {
				...state,
				isLoading: false,
				isError: false,
			};
	}
}

export default QuestionReducer