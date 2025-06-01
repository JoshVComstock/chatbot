export const TypingIndicator = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "flex-start",
      marginBottom: "16px",
    }}
  >
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "6px",
        padding: "14px 18px",
        borderRadius: "16px 16px 16px 0",
        backgroundColor: "white",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
      }}
    >
      <div
        style={{
          width: "8px",
          height: "8px",
          borderRadius: "50%",
          backgroundColor: "#FF6B35",
          opacity: 0.7,
          animation: "bounce 1.4s infinite ease-in-out both",
        }}
      />
      <div
        style={{
          width: "8px",
          height: "8px",
          borderRadius: "50%",
          backgroundColor: "#FF6B35",
          opacity: 0.7,
          animation: "bounce 1.4s infinite ease-in-out both",
          animationDelay: "0.2s",
        }}
      />
      <div
        style={{
          width: "8px",
          height: "8px",
          borderRadius: "50%",
          backgroundColor: "#FF6B35",
          opacity: 0.7,
          animation: "bounce 1.4s infinite ease-in-out both",
          animationDelay: "0.4s",
        }}
      />
    </div>
  </div>
);
