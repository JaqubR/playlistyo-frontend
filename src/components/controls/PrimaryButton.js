import './PrimaryButton.css';

function PrimaryButton({ label, clickAction, type }) {
    return (
        <button onClick={clickAction} className="primary-button" type={type}>
            {label}
        </button>
    )
}

export default PrimaryButton;