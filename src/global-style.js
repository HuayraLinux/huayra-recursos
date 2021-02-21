import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  :root {
    --primary-color: #eb6d7f;
    --secondary-color: #8D8D8D;

    --shadow-offset: 5px;
    --shadow-color: #e84588;
  }

  html {
    background-color: #7fdcd4;
    color: var(--text-secondary-color);
  }

  body {
    overflow: hidden;
    user-select: none;
  }
`;

