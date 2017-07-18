import styled from 'styled-components';

const ButtonSquared = styled.button`
  background: none;
  border-radius: ${props =>
    props.radius === 'circle'
      ? props.theme.borders.radius.circle
      : props.radius === 'rounded'
        ? props.theme.borders.radius.rounded
        : props.theme.borders.radius.none};
  border: none;
  color: ${props => props.theme.colors.foreground};
  cursor: pointer;
  height: 33px;
  line-height: 0;
  margin: 4px 1px;
  outline: none;
  text-align: center;
  transition: background ease 0.2s;
  width: 34px;

  &:hover {
    background: ${props => props.theme.colors.hoverBackground};
  }

  &:active {
    background: ${props => props.theme.colors.activeBackground};
  }

  &:focus {
    background: ${props => props.theme.colors.focusBackground};
  }

  ${props => props.styledButtonSquared};
`;

export default ButtonSquared;
