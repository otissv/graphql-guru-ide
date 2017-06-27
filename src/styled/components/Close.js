import React from 'react';
import styled from 'styled-components';
import Icon from './Icon';
import closeIcon from '../../icons/cross.svg';

const Close = styled.button`
  float: right;
  border: none;
  background: none;
  outline: none;
`;

export default props => {
  return (
    <Close onClick={props.onClick}>
      <Icon hover={props.hover} src={closeIcon} />
    </Close>
  );
};
