export const Message = ({ sender, children }) => (
  <div
    style={{
      display: "flex",
      justifyContent: sender === "user" ? "flex-end" : "flex-start",
      marginBottom: "16px",
    }}
  >
    <div
      style={{
        maxWidth: "75%",
        padding: "12px 16px",
        borderRadius:
          sender === "user" ? "16px 16px 0 16px" : "16px 16px 16px 0",
        backgroundColor: sender === "user" ? "#FF6B35" : "white",
        color: sender === "user" ? "white" : "#333",
        fontWeight: sender === "user" ? 400 : 400,
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        fontSize: "14px",
        lineHeight: "1.5",
      }}
    >
      {children}
    </div>
  </div>
);
