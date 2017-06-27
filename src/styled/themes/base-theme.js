import { injectGlobal } from 'styled-components';
import normalizeStyled from 'normalize-styled';

export default function base ({ colors }) {
  return injectGlobal`
    ${normalizeStyled}
  
    html,
    body,
    pre {
      background: ${colors.background};
      color: ${colors.foreground};
    },

    body {
      padding: 0;
      background: ${colors.background};
    }

    body,
    p,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    a,
    button {
      font-family: 'Biryani', sans-serif;
      text-rendering: optimizeLegibility !important;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.004);
      font-size: 14px;
    }

    * {
      box-sizing: border-box;
    }

    ::selection {
      background: ${colors.primary};
    }

    a, area, button, input, label, select, summary, textarea {
      touch-action: manipulation;
    }
  `;
}
