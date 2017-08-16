import { injectGlobal } from 'styled-components';
import normalizeStyled from 'styled-normalize';

export default function base ({ colors, fonts }) {
  return injectGlobal`
    ${normalizeStyled}
  
    html {
      line-height: ${fonts.lineHeight}
    }
    
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
      font-family: ${fonts.family.serif};
      ${fonts.smooth}
      font-size: ${fonts.size.default}
    }

    * {
      box-sizing: border-box;
    }

    ::selection {
      background: ${colors.primary};
    }

    pre {
      font-size: ${fonts.size.small};
      font-family: ${fonts.family.code};
      line-height: 1.3;
    }

    a, area, button, input, label, select, summary, textarea {
      touch-action: manipulation;
    }
  `;
}
