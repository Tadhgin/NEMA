import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: "Inter", sans-serif;
    background-color: #121212;
    color: #ffffff;
    line-height: 1.6;
    font-size: 16px;
    transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;
  }

  h1, h2, h3 {
    font-weight: 600;
  }

  h1 {
    font-size: 28px;
  }

  h2 {
    font-size: 22px;
  }

  h3 {
    font-size: 18px;
  }

  p {
    font-size: 14px;
    opacity: 0.9;
  }

  a {
    color: inherit;
    text-decoration: none;
    transition: color 0.2s ease-in-out;
  }

  a:hover {
    color: #00aaff;
  }

  ul {
    list-style: none;
  }

  button {
    cursor: pointer;
    border: none;
    padding: 10px 15px;
    font-size: 14px;
    border-radius: 5px;
    transition: background 0.3s ease-in-out;
  }
`;

export default GlobalStyle;
