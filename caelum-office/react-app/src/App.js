import React from "react";
import GlobalStyle from "./styles/GlobalStyle";

function App() {
  return (
    <>
      <GlobalStyle />
      <div style={{ textAlign: "center", padding: "20px" }}>
        <h1>Welcome to My React App</h1>
        <p>This is a clean starting point for your application.</p>
        <a
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#61dafb", textDecoration: "none" }}
        >
          Learn React
        </a>
      </div>
    </>
  );
}

export default App;