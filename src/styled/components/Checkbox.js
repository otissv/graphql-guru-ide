import React, { PureComponent } from 'react';
import CheckboxStyled from '../Checkbox-styled';
import styled from 'styled-components';

const Label = styled.label`
  display: ${props => props.display || 'inline'};
  margin-bottom: 25px;
`;

export default class Checkbox extends PureComponent {
  render () {
    const { checked, children, display } = this.props;

    return (
      <Label display={display}>
        <CheckboxStyled type="checkbox" checked={checked} />
        {children}
      </Label>
    );
  }
}
