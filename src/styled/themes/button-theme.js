export default function button ({ borders, colors, fonts }) {
  return {
    backgroundColor: colors.background,
    border: `1px solid ${colors.background}`,
    boxSizing: 'border-box',
    color: colors.foreground,
    display: 'inline-block',
    fontSize: fonts.size.default,
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
  };
}
