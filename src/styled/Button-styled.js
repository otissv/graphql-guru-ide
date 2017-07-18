import styled from 'styled-components';

const Button = styled.button`
  background-color: ${props => props.theme.button.backgroundColor};
  border: ${props => {
    return props.primary
      ? (props.primary && props.primary.border) ||
        props.theme.button.primary.border
      : props.theme.button.border;
  }};
  box-sizing: ${props => props.theme.button.boxSizing};
  color: ${props => props.theme.button.color};
  display: ${props => props.theme.button.display};
  font-size: ${props => props.theme.button.fontSize};
  font: ${props => props.theme.button.font};
  line-height: ${props => props.theme.button.lineHeight};
  margin: ${props => props.theme.button.background};
  background: ${props => props.theme.button.background};
  padding: ${props => props.theme.button.padding};
  text-align: ${props => props.theme.button.textAlign};
  text-decoration: ${props => props.theme.button.textDecoration};
  text-transform: ${props => props.theme.button.textTransform};
  transition-property: ${props => props.theme.button.transitionProperty};
  transition: ${props => props.theme.button.transition};
  vertical-align: ${props => props.theme.button.verticalAlign};
  outline: ${props => props.theme.button.outline};

  &:hover {
    border: ${props => {
      return props.primary
        ? (props.primary.hover && props.primary.hover.border) ||
          props.theme.button.primary.hover.border
        : props.theme.button.hover.border;
    }};
    background: ${props => {
      return props.primary
        ? (props.primary.hover && props.primary.hover.background) ||
          props.theme.button.primary.hover.background
        : props.theme.button.hover.background;
    }};
    color: ${props => {
      return props.primary
        ? (props.primary.hover && props.primary.hover.color) ||
          props.theme.button.primary.hover.color
        : props.theme.button.hover.color;
    }};
  }

  &:active {
    border: ${props => {
      return props.primary
        ? (props.primary.active && props.primary.active.border) ||
          props.theme.button.primary.active.border
        : props.theme.button.active.border;
    }};
    background: ${props => {
      return props.primary
        ? (props.primary.active && props.primary.active.background) ||
          props.theme.button.primary.active.background
        : props.theme.button.active.background;
    }};
    color: ${props => {
      return props.primary
        ? (props.primary.active && props.primary.active.color) ||
          props.theme.button.primary.active.color
        : props.theme.button.active.color;
    }};
  }

  &:focus {
    border: ${props => {
      return props.primary
        ? (props.primary.focus && props.primary.focus.border) ||
          props.theme.button.primary.focus.border
        : props.theme.button.focus.border;
    }};
    background: ${props => {
      return props.primary
        ? (props.primary.focus && props.primary.focus.background) ||
          props.theme.button.primary.focus.background
        : props.theme.button.focus.background;
    }};
    color: ${props => {
      return props.primary
        ? (props.primary.focus && props.primary.focus.color) ||
          props.theme.button.primary.focus.color
        : props.theme.button.focus.color;
    }};
  }

  ${props => props.styledButton};
`;

export default Button;
