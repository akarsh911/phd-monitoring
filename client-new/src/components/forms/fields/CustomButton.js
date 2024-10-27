import "./Fields.css";
const CustomButton = ({ text, onClick }) => {
    return (
        <button onClick={onClick} className="custom-button">
            {text}
        </button>
    );
};
export default CustomButton;