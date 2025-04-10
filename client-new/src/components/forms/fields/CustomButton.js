import "./Fields.css";
const CustomButton = ({ text, onClick,disabled=false }) => {
    return (
        <button onClick={onClick}   disabled={disabled} className="custom-button">
            {text}
        </button>
    );
};
export default CustomButton;