const Button = ({ type, value, onClick, children }) => {
    return (
        <button
        className='btn btn-dark btn-lg reset'
        type={type}
        value={value}
        onClick={onClick}
      >{children}</button>
		)
}

export default Button
