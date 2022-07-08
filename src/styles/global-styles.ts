import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100%;
    width: 100%;
    background: #FAFBFB;
  }

  body {
    font-family: 'Noto Sans KR', sans-serif;
  }

  #root {
    min-height: 100%;
    min-width: 100%;
  }

  a {
    text-decoration-line: none;
  }

`;
