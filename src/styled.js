import normalizeStyled from 'normalize-styled';
import { injectGlobal } from 'styled-components';

const foreground = '#f1f1f1';
const background = '#000000';
const primary = '#E10098';
const secondary = '#515151';

export const colors = {
  foreground,
  background,
  primary,
  secondary,
  border: foreground,
  borderSecondary: secondary,
  borderPrimary: primary,
  hoverBackground: secondary,
  activeBackground: secondary,
  focusBackground: secondary,
  visitedBackground: secondary,
  hoverForeground: secondary,
  activeForeground: secondary,
  focusForeground: secondary,
  visitedForeground: secondary
};

const borders = {
  radius: {
    none: 0,
    rounded: '3px',
    circle: '100%'
  },
  thin: `1px solid ${foreground}`,
  thinSecondary: `1px solid ${secondary}`,
  thinPrimary: `1px solid ${primary}`,
  thick: `2px solid ${foreground}`,
  thickSecondary: `2px solid ${secondary}`,
  thickPrimary: `2px solid ${primary}`
};

const fonts = {
  base: '14px',
  small: '13px'
};

export const baseStyles = injectGlobal`
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
    background: ${primary};
  }

  a, area, button, input, label, select, summary, textarea {
    touch-action: manipulation;
  }
`;

// input:not([type]),
//   input[type=text],
//   input[type=password],
//   input[type=email],
//   input[type=url],
//   input[type=search],
//   input[type=tel],
//   input[type=number],
//   input[type=datetime],
//   input[type=datetime-local],
//   input[type=date],
//   input[type=month],
//   input[type=time],
//   input[type=week],
//   input[type=color],
//   select {
//     border: none;
//     background: ${colors.background};
//     border-bottom: ${borders.thin};
//     border-radius: ${borders.radius.none};
//     padding: 4px 3px;
//     color: ${colors.foreground};
//     outline: none;

//     transition: background ease 0.2s;
//   }

//   textarea {
//     background: ${colors.background};
//     border: ${borders.thin};
//     border-radius: ${borders.radius.none};
//     color: ${colors.foreground};
//     outline: none;

//     transition: background ease 0.2s;
//   }

//   input[type=text] {
//     margin-left: 5px;
//     margin-right: 5px;
//   }

//   input:not([type]):focus,
//   input[type=text]:focus,
//   input[type=password]:focus,
//   input[type=email]:focus,
//   input[type=url]:focus,
//   input[type=search]:focus,
//   input[type=tel]:focus,
//   input[type=number]:focus,
//   input[type=datetime]:focus,
//   input[type=datetime-local]:focus,
//   input[type=date]:focus,
//   input[type=month]:focus,
//   input[type=time]:focus,
//   input[type=week]:focus,
//   input[type=color]:focus,
//   select:focus,
//   textarea:focus,
//   input:not([type]):hover,
//   input[type=text]:hover,
//   input[type=password]:hover,
//   input[type=email]:hover,
//   input[type=url]:hover,
//   input[type=search]:hover,
//   input[type=tel]:hover,
//   input[type=number]:hover,
//   input[type=datetime]:hover,
//   input[type=datetime-local]:hover,
//   input[type=date]:hover,
//   input[type=month]:hover,
//   input[type=time]:hover,
//   input[type=week]:hover,
//   input[type=color]:hover,
//   select:hover,
//   textarea:hover {
//     background: ${colors.hoverBackground};
//   }

export default {
  colors,
  borders,
  navbar: {
    height: '40px'
  },
  button: {
    backgroundColor: colors.background,
    border: `1px solid ${colors.background}`,
    boxSizing: 'border-box',
    color: colors.foreground,
    display: 'inline-block',
    fontSize: '14px',
    font: 'inherit',
    lineHeight: '38px',
    margin: 0,
    overflow: 'visible',
    padding: '0 30px',
    textAlign: 'center',
    textDecoration: 'none',
    textTransform: 'uppercase',
    transitionProperty: 'color,background-color,border-color',
    transition: '.1s ease-in-out',
    verticalAlign: 'middle',
    outline: 'none',
    notDisabled: {
      cursor: 'pointer'
    },
    hover: {
      border: `1px solid ${colors.secondary}`,
      background: colors.secondary,
      color: colors.foreground
    },
    focus: {
      border: `1px solid ${colors.background}`,
      background: colors.secondary
    },
    active: {
      border: `1px solid ${colors.background}`,
      background: colors.secondary
    },
    primary: {
      color: colors.primary,
      border: borders.thinPrimary,
      hover: {
        border: {
          border: borders.thinPrimary,
          background: colors.secondary,
          color: colors.foreground
        }
      },
      active: {
        border: {
          border: borders.thinPrimary,
          background: colors.secondary,
          color: colors.foreground
        }
      },
      focus: {
        border: {
          border: borders.thinPrimary,
          background: colors.secondary,
          color: colors.foreground
        }
      }
    }
  },
  checkbox: {
    display: 'inline-block',
    height: '16px',
    width: '16px',
    overflow: 'hidden',
    margin: '-4px 5px 0 0',
    verticalAlign: 'middle',
    webkitAppearance: 'none',
    backgroundColor: colors.background,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '50% 50%',
    border: borders.thin,
    transition: '.2s ease-in-out',
    transitionProperty: 'background-color,border',
    outline: 'none',
    padding: 0,
    borderRadius: 0,
    color: colors.foreground,
    notDisabled: {
      cursor: 'pointer'
    },
    hover: {
      background: colors.secondary
    },
    focus: {
      background: colors.secondary
    },
    indeterminate: {
      backgroundColor: colors.foreground,
      color: colors.background
    },
    checked: {
      backgroundColor: colors.foreground,
      color: colors.background,
      backgroundImage: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxOC4xLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkNoZWNrIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCINCgkgdmlld0JveD0iMCAwIDIwIDIwIiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCAyMCAyMCIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+DQo8cGF0aCBkPSJNOC4yOTQsMTYuOTk4Yy0wLjQzNSwwLTAuODQ3LTAuMjAzLTEuMTExLTAuNTUzTDMuNjEsMTEuNzI0Yy0wLjQ2NS0wLjYxMy0wLjM0NC0xLjQ4NiwwLjI3LTEuOTUxDQoJYzAuNjE1LTAuNDY3LDEuNDg4LTAuMzQ0LDEuOTUzLDAuMjdsMi4zNTEsMy4xMDRsNS45MTEtOS40OTJjMC40MDctMC42NTIsMS4yNjctMC44NTIsMS45MjEtMC40NDUNCgljMC42NTMsMC40MDYsMC44NTQsMS4yNjYsMC40NDYsMS45Mkw5LjQ3OCwxNi4zNGMtMC4yNDIsMC4zOTEtMC42NjEsMC42MzUtMS4xMiwwLjY1NkM4LjMzNiwxNi45OTgsOC4zMTYsMTYuOTk4LDguMjk0LDE2Ljk5OHoiLz4NCjwvc3ZnPg0K'
    }
  },
  input: {
    background: colors.background,
    border: 'none',
    borderBottom: borders.thin,
    borderRadius: 0,
    color: colors.foreground,
    display: 'inline-block',
    height: '40px',
    maxWidth: '100%',
    outline: 'none',
    overflow: 'visible',
    padding: '0 10px',
    transition: '.2s ease-in-out',
    transitionProperty: 'color,background-color,border',
    verticalAlign: 'middle',
    webkitAppearance: 'none',
    width: '100%',
    hover: {
      background: colors.secondary
    },
    active: {
      background: colors.secondary
    },
    focus: {
      background: colors.secondary
    }
  },
  textarea: {
    background: colors.background,
    border: borders.thin,
    borderRadius: 0,
    boxSizing: 'border-box',
    color: colors.foreground,
    font: 'inherit',
    margin: 0,
    maxWidth: '100%',
    padding: '10px 10px 0 10px;',
    touchAction: 'manipulation',
    verticalAlign: 'top',
    webkitAppearance: 'none',
    width: '100%',
    outline: 'none',
    hover: {
      background: colors.secondary
    },
    active: {
      background: colors.secondary
    },
    focus: {
      background: colors.secondary
    }
  }
};
