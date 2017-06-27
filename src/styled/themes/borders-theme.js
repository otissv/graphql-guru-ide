export default function Borders ({ colors }) {
  return {
    radius: {
      none: 0,
      rounded: '3px',
      circle: '100%'
    },
    thin: `1px solid ${colors.foreground}`,
    thinSecondary: `1px solid ${colors.secondary}`,
    thinPrimary: `1px solid ${colors.primary}`,
    thick: `2px solid ${colors.foreground}`,
    thickSecondary: `2px solid ${colors.secondary}`,
    thickPrimary: `2px solid ${colors.primary}`
  };
}
