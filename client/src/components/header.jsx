import { Settings } from "lucide-react";

export const Header = ({ onSettingsClick, children }) => (
  <div
    style={{
      backgroundColor: "#FF6B35",
      color: "white",
      padding: "14px 20px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    }}
  >
    <div style={{ display: "flex", alignItems: "center" }}>{children}</div>
    <div
      onClick={onSettingsClick}
      style={{
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "32px",
        height: "32px",
        borderRadius: "50%",
        backgroundColor: "rgba(255,255,255,0.2)",
      }}
    >
      <Settings size={18} color="white" />
    </div>
  </div>
);
