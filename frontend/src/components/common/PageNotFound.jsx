export default function PageNotFound() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#fff",
        color: "#333",
        fontFamily: "sans-serif",
      }}
    >
      <h1 style={{ fontSize: "4rem", margin: "0" }}>404</h1>
      <p style={{ fontSize: "1.5rem" }}>Page Not Found</p>
    </div>
  );
}
