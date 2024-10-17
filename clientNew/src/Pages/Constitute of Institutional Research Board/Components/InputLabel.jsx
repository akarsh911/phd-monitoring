import PropTypes from "prop-types";

const InputLabel = ({
	label = "",
	register,
	name,
	placeholder = "",
	type = "text",
	className = "",
}) => {
	return (
		<div className={`tw-flex tw-flex-col tw-gap-y-0.5 ${className}`}>
			<label
				className="tw-font-bold"
				htmlFor={name}
			>
				{label}
			</label>
			<input
				type={type}
				id={name}
				placeholder={placeholder}
				className="tw-rounded-md tw-p-2 tw-border-2 tw-border-gray-400 tw-w-full tw-max-w-xs"
				{...register(name)}
			/>
		</div>
	);
};

InputLabel.propTypes = {
	label: PropTypes.string,
	register: PropTypes.func.isRequired,
	name: PropTypes.string.isRequired,
	placeholder: PropTypes.string,
	type: PropTypes.string,
	className: PropTypes.string,
};

export default InputLabel;
