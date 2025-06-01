export const ChatWindow = ({ isOpen, children }) => (
  <div
    style={{
      position: "fixed",
      bottom: "100px",
      right: "30px",
      width: "360px",
      height: "520px",
      borderRadius: "16px",
      overflow: "hidden",
      boxShadow: "0 8px 30px rgba(0,0,0,0.16)",
      backgroundColor: "#fff",
      display: "flex",
      flexDirection: "column",
      transition: "all 0.3s ease",
      transform: isOpen ? "scale(1)" : "scale(0)",
      opacity: isOpen ? 1 : 0,
      transformOrigin: "bottom right",
      zIndex: 999,
    }}
  >
    {children}
  </div>
);
