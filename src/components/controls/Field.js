import "./Field.css";

function Field({ type, value, placeholder }) {
    return (
        <input
            type={type}
            value={value.get()}
            onChange={e => value.set(e.target.value)}
            className="field"
            placeholder={placeholder}
        />
    );
}

export default Field;