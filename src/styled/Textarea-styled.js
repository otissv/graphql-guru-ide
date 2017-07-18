import styled from 'styled-components';

const Textarea = styled.textarea`
  background: ${props => props.theme.textarea.background};
  border: ${props => props.theme.textarea.border};
  border-radius: ${props => props.theme.textarea.borderRadius};
  box-sizing: ${props => props.theme.textarea.boxSizing};
  color: ${props => props.theme.textarea.color};
  font: ${props => props.theme.textarea.font};
  margin: ${props => props.theme.textarea.margin};
  max-width: ${props => props.theme.textarea.maxWidth};
  overflow: auto;${props => props.theme.textarea.overflow};
  padding: ${props => props.theme.textarea.padding};
  touch-action: ${props => props.theme.textarea.touchAction};
  vertical-align: ${props => props.theme.textarea.verticalAlign};
  -webkit-appearance: ${props => props.theme.textarea.webkitAppearance};
  width: ${props => props.theme.textarea.width};
  &:hover {
    background:  ${props => props.theme.textarea.hover.background};
  }
  
  &:active {
    background:  ${props => props.theme.textarea.active.background};
  }

  &:focus {
    background:  ${props => props.theme.textarea.focus.background};
  }

  ${props => props.styledTextarea};
}
`;

export default Textarea;
