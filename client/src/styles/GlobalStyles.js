import { createGlobalStyle } from 'styled-components';
import theme from './theme';

const GlobalStyles = createGlobalStyle`
  ${theme.animations.bounce}
  
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  
  body {
    font-family: ${theme.typography.fontFamily};
    color: ${theme.colors.text};
    font-size: ${theme.typography.sizes.md};
    line-height: 1.5;
  }
  
  button {
    cursor: pointer;
    font-family: ${theme.typography.fontFamily};
  }
  
  input, textarea {
    font-family: ${theme.typography.fontFamily};
  }
`;

export default GlobalStyles;