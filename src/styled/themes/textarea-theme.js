export default function textarea ({ borders, colors }) {
  return {
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
  };
}
