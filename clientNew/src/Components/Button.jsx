import PropTypes from "prop-types";

const Button = ({ onClick, children, type = "button", className = "" }) => {
	return (
		<button
			type={type}
			onClick={onClick}
			className={`${className}`}
		>
			{children}
		</button>
	);
};

Button.propTypes = {
	onClick: PropTypes.func.isRequired,
	children: PropTypes.node.isRequired,
	type: PropTypes.oneOf(["button", "submit", "reset"]),
	className: PropTypes.string,
};

export default Button;
