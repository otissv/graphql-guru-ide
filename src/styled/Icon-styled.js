import React from 'react';
import styled from 'styled-components';
import Isvg from 'react-inlinesvg';

const Svg = styled(Isvg)`
  fill: ${props => props.theme.colors.foreground};
  height: 16px;
  width: 16px;
  display: inline-block;

  &:hover {
    fill: ${props => (props.hover ? props.theme.colors.primary : props.theme.colors.foreground)}
  }
}
`;

export default Svg;
