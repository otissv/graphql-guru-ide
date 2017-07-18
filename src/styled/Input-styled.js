import styled from 'styled-components';

const Input = styled.input`
  background: ${props => props.theme.input.background};
  border: ${props => props.theme.input.border};
  border-bottom: ${props => props.theme.input.borderBottom};
  color: ${props => props.theme.input.color};
  display: ${props => props.theme.input.display};
  font-size: ${props => props.theme.input.fontSize};
  height: ${props => props.theme.input.height};
  max-width: ${props => props.theme.input.maxWidth};
  padding: ${props => props.theme.input.padding};
  transition-property: ${props => props.theme.input.transitionProperty};
  transition: ${props => props.theme.input.transition};
  vertical-align: ${props => props.theme.input.verticalAlign};
  width: ${props => props.theme.input.width};
  outline: ${props => props.theme.input.outline};
  -webkit-appearance: ${props => props.theme.input.webkitAppearance};
  overflow: ${props => props.theme.input.overflow};
  border-radius: ${props => props.theme.input.borderRadius};

  &:hover {
    background: ${props => props.theme.input.hover.background};
  }

  &:active {
    background: ${props => props.theme.input.active.background};
  }

  &:focus {
    background: ${props => props.theme.input.focus.background};
  }

  ${props => props.styledInput};
`;

export default Input;
