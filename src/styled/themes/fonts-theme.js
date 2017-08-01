export default function fonts ({ colors }) {
  return {
    color: colors.foreground,
    smooth: `
      text-rendering: optimizeLegibility !important;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.004);
    `,
    family: {
      code:
        "'Source Code Pro', 'Consolas', 'Inconsolata', 'Droid Sans Mono', 'Monaco', monospace !important",
      serif: "'Biryani', sans-serif",
      sans: ''
    },
    size: {
      xsmall: '11px',
      small: '13px',
      default: '14px',
      large: '20px'
    },
    lineHeight: 1.5
  };
}
