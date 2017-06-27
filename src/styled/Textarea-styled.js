import React from 'react';
import styled from 'styled-components';

const Textarea = styled.textarea`
  background: ${props => props.background || props.theme.textarea.background};
  border: ${props => props.border || props.theme.textarea.border};
  border-radius: ${props => props.borderRadius || props.theme.textarea.borderRadius};
  box-sizing: ${props => props.boxSizing || props.theme.textarea.boxSizing};
  color: ${props => props.color || props.theme.textarea.color};
  font: ${props => props.font || props.theme.textarea.font};
  margin: ${props => props.margin || props.theme.textarea.margin};
  max-width: ${props => props.maxWidth || props.theme.textarea.maxWidth};
  overflow: auto;${props => props.overflow || props.theme.textarea.overflow};
  padding: ${props => props.padding || props.theme.textarea.padding};
  touch-action: ${props => props.touchAction || props.theme.textarea.touchAction};
  vertical-align: ${props => props.verticalAlign || props.theme.textarea.verticalAlign};
  -webkit-appearance: ${props => props.webkitAppearance || props.theme.textarea.webkitAppearance};
  width: ${props => props.width || props.theme.textarea.width};
  &:hover {
    background:  ${props => (props.hover && props.hover.background) || props.theme.textarea.hover.background};
  }
  
  &:active {
    background:  ${props => (props.active && props.active.background) || props.theme.textarea.active.background};
  }

  &:focus {
    background:  ${props => (props.focus && props.focus.background) || props.theme.textarea.focus.background};
  }
}
`;

export default Textarea;
