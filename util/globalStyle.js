import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  html, body {
    padding: 0;
    margin: 0;
    font-family: 'Montserrat', sans-serif;
    background: ${({ theme }) => theme.body.background};
    color: ${({ theme }) => theme.body.text};
    overscroll-behavior: none;
  }
  body {
    margin-top: 60px;
  }
  * {
        box-sizing: border-box;
    }
`;
