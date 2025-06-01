import { MessageSquare, X } from "lucide-react";

export const FloatingButton = ({ onClick, isOpen }) => {
  return (
    <div
      onClick={onClick}
      style={{
        position: "fixed",
        bottom: "30px",
        right: "30px",
        width: "60px",
        height: "60px",
        borderRadius: "50%",
        backgroundColor: isOpen ? "#D84315" : "#FF6B35",
        boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        transition: "all 0.3s ease",
        zIndex: 1000,
      }}
    >
      {isOpen ? (
        <X size={24} color="white" />
      ) : (
        <MessageSquare size={24} color="white" />
      )}
    </div>
  );
};
