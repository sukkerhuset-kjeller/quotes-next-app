import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  html, body {
    padding: 0;
    margin: 0;
    font-family: 'Montserrat', sans-serif;
    background: ${({ theme }) => theme.bodyBackground};
    overscroll-behavior: none;
  }
  * {
        box-sizing: border-box;
    }
`;
