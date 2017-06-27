import React from 'react';
import styled from 'styled-components';

const Input = styled.input`
  background: ${props => props.background || props.theme.input.background};
  border: ${props => props.border || props.theme.input.border};
  border-bottom: ${props => props.borderBottom || props.theme.input.borderBottom};
  color: ${props => props.color || props.theme.input.color};
  display: ${props => props.display || props.theme.input.display};
  font-size: ${props => props.fontSize || props.theme.input.fontSize};
  height: ${props => props.height || props.theme.input.height};
  max-width: ${props => props.maxWidth || props.theme.input.maxWidth};
  padding: ${props => props.padding || props.theme.input.padding};
  transition-property: ${props => props.transitionProperty || props.theme.input.transitionProperty};
  transition: ${props => props.transition || props.theme.input.transition};
  vertical-align: ${props => props.verticalAlign || props.theme.input.verticalAlign};
  width: ${props => props.width || props.theme.input.width};
  outline: ${props => props.outline || props.theme.input.outline};
  -webkit-appearance: ${props => props.webkitAppearance || props.theme.input.webkitAppearance};
  overflow: ${props => props.overflow || props.theme.input.overflow};
  border-radius: ${props => props.borderRadius || props.theme.input.borderRadius};

  &:hover {
    background:  ${props => (props.hover && props.hover.background) || props.theme.input.hover.background};
  }
  
  &:active {
    background:  ${props => (props.active && props.active.background) || props.theme.input.active.background};
  }

  &:focus {
    background:  ${props => (props.focus && props.focus.background) || props.theme.input.focus.background};
  }
`;

export default Input;
