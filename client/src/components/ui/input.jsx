export const Input = ({ value, onChange }) => (
  <input
    value={value}
    onChange={onChange}
    placeholder="¿En qué puedo ayudarte?"
    style={{
      flex: 1,
      border: "none",
      padding: "10px 14px",
      fontSize: "14px",
      borderRadius: "24px",
      backgroundColor: "transparent",
      outline: "none",
    }}
  />
);