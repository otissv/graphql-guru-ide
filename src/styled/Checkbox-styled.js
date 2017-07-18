import styled from 'styled-components';

const CheckboxStyled = styled.input`
  display: ${props => props.display || props.theme.checkbox.display};
  height: ${props => props.height || props.theme.checkbox.height};
  width: ${props => props.width || props.theme.checkbox.width};
  overflow: ${props => props.overflow || props.theme.checkbox.overflow};
  margin: ${props => props.margin || props.theme.checkbox.margin};
  vertical-align: ${props =>
    props.verticalAlign || props.theme.checkbox.verticalAlign};
  -webkit-appearance: ${props =>
    props.webkitAppearance || props.theme.checkbox.webkitAppearance};
  background-color: ${props =>
    props.backgroundColor || props.theme.checkbox.backgroundColor};
  background-repeat: ${props =>
    props.backgroundRepeat || props.theme.checkbox.backgroundRepeat};
  background-position: ${props =>
    props.backgroundPosition || props.theme.checkbox.backgroundPosition};
  border:  ${props => props.border || props.theme.checkbox.border};
  transition: ${props => props.transition || props.theme.checkbox.transition};
  transition-property: ${props =>
    props.transitionProperty || props.theme.checkbox.transitionProperty};
  outline: ${props => props.outline || props.theme.checkbox.outline};
  padding: ${props => props.padding || props.theme.checkbox.padding};
  border-radius: ${props =>
    props.borderRadius || props.theme.checkbox.borderRadius};
  color: ${props => props.color || props.theme.checkbox.color};

  &:not(:disabled) {
    cursor: pointer;
  }

  &:hover {
    background: background:  ${props =>
      (props.hover && props.hover.background) ||
      props.theme.checkbox.hover.background};
  }

  &:focus {
    background:  ${props => props.theme.checkbox.focus.background};
  }

  &:checked, 
  &:indeterminate {
    background-color:  ${props => props.theme.checkbox.checked.backgroundColor};
    color: ${props => props.theme.checkbox.checked.color};
    background-image: url(${props =>
      props.theme.checkbox.checked.backgroundImage});
  }

  ${props => props.styledCheckbox};
}
`;

export default CheckboxStyled;
