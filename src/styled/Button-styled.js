import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  background-color: ${props => props.backgroundColor || props.theme.button.backgroundColor};
border: ${props => {
  return props.primary ? (props.primary && props.primary.border) || props.theme.button.primary.border : props.theme.button.border;
}};
  box-sizing: ${props => props.boxSizing || props.theme.button.boxSizing};
  color: ${props => props.color || props.theme.button.color};
  display: ${props => props.display || props.theme.button.display};
  font-size: ${props => props.fontSize || props.theme.button.fontSize};
  font: ${props => props.font || props.theme.button.font};
  line-height: ${props => props.lineHeight || props.theme.button.lineHeight};
  margin: ${props => props.margin || props.theme.button.background};
  background: ${props => props.background || props.theme.button.background};
  padding: ${props => props.padding || props.theme.button.padding};
  text-align: ${props => props.textAlign || props.theme.button.textAlign};
  text-decoration: ${props => props.textDecoration || props.theme.button.textDecoration};
  text-transform: ${props => props.textTransform || props.theme.button.textTransform};
  transition-property: ${props => props.transitionProperty || props.theme.button.transitionProperty};
  transition: ${props => props.transition || props.theme.button.transition};
  vertical-align: ${props => props.verticalAlign || props.theme.button.verticalAlign};
  outline: ${props => props.outline || props.theme.button.outline};

  &:hover {
    border: ${props => {
      return props.primary ? (props.primary.hover && props.primary.hover.border) || props.theme.button.primary.hover.border : props.theme.button.border;
    }};
    background: ${props => {
      return props.primary ? (props.primary.hover && props.primary.hover.background) || props.theme.button.primary.hover.background : props.theme.button.hover.background;
    }};
    color: ${props => {
      return props.primary ? (props.primary.hover && props.primary.hover.color) || props.theme.button.primary.hover.color : props.theme.button.hover.color;
    }};
  }

  &:active {
    border: ${props => {
      return props.primary ? (props.primary.active && props.primary.hover.border) || props.theme.button.primary.hover.border : props.theme.button.border;
    }};
    background: ${props => {
      return props.primary ? (props.primary.hover && props.primary.hover.background) || props.theme.button.primary.hover.background : props.theme.button.hover.background;
    }};
    color: ${props => {
      return props.primary ? (props.primary.hover && props.primary.hover.color) || props.theme.button.primary.hover.color : props.theme.button.hover.color;
    }};
  }

  &:focus {
    border: ${props => {
      return props.primary ? (props.primary.hover && props.primary.hover.border) || props.theme.button.primary.hover.border : props.theme.button.border;
    }};
    background: ${props => {
      return props.primary ? (props.primary.hover && props.primary.hover.background) || props.theme.button.primary.hover.background : props.theme.button.hover.background;
    }};
    color: ${props => {
      return props.primary ? (props.primary.hover && props.primary.hover.color) || props.theme.button.primary.hover.color : props.theme.button.hover.color;
    }};
  }
`;

export default Button;
