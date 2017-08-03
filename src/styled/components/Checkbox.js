import React, { PureComponent } from 'react';
import CheckboxStyled from '../Checkbox-styled';
import styled from 'styled-components';

const Label = styled.label`
  margin-bottom: 15px;
  ${props => props.styledLabel};
`;

export default class Checkbox extends PureComponent {
  render () {
    const { children, styledLabel } = this.props;

    return (
      <Label styledLabel={styledLabel}>
        <CheckboxStyled type="checkbox" {...this.props} children={null} />
        {children}
      </Label>
    );
  }
}
