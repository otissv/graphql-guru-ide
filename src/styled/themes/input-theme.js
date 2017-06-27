export default function input ({ borders, colors }) {
  return {
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
    fontSize: '14px',
    hover: {
      background: colors.secondary
    },
    active: {
      background: colors.secondary
    },
    focus: {
      background: colors.secondary
    },
    size: {
      large: {
        height: '55px',
        padding: '0 12px',
        fontSize: '20px'
      },
      small: {
        height: '30px',
        padding: '0 8px',
        fontSize: '14px'
      }
    },
    widths: {
      large: '500px',
      medium: '200px',
      small: '130px',
      xsmall: '40px'
    },
    context: {
      danger: {
        color: colors.danger,
        borderColor: colors.danger
      },
      success: {
        color: colors.success,
        borderColor: colors.success
      },
      disabled: {}
    }
  };
}
