import "./Fields.css";
const CustomButton = ({ text, onClick,disabled=false, label }) => {
    return (
        <>
         {label && (<label className="input-label">{label}</label>)}
        <button onClick={onClick}   disabled={disabled} className="custom-button">
            {text}
        </button>
        </>
    );
};
export default CustomButton;