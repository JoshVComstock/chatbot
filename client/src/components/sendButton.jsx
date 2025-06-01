import { Send } from "lucide-react";

export const SendButton = ({ onClick, disabled }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    style={{
      border: "none",
      width: "38px",
      height: "38px",
      borderRadius: "50%",
      backgroundColor: disabled ? "#ccc" : "#FF6B35",
      color: "white",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: disabled ? "not-allowed" : "pointer",
      transition: "background-color 0.3s",
      padding: 0,
    }}
  >
    <Send size={18} />
  </button>
);
