export const HeaderTitle = ({ children }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
    }}
  >
    <h1
      style={{
        margin: 0,
        fontSize: "16px",
        fontWeight: 600,
      }}
    >
      {children}
    </h1>
    <p
      style={{
        margin: "2px 0 0 0",
        fontSize: "12px",
        opacity: 0.85,
      }}
    >
      Estamos para servirte
    </p>
  </div>
);
