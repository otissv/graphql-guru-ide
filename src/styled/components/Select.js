import React, { PureComponent } from 'react';
import autobind from 'class-autobind';
import Input from '../Input-styled';
import Button from '../Button-styled';
import styled from 'styled-components';
import Icon from './Icon';
import triangleDown from '../../icons/triangle-down.svg';

const SelectContainer = styled.div`
  position: relative;
  width: auto;
`;
const Options = styled.div`
  position: absolute;
  width: auto;
  max-height: '200px';
  border: ${props => props.theme.borders.thin};
  border-top: none;
  visibility: ${props => props.open ? 'visible' : 'hidden'};
  width: 100%;
  background: ${props => props.theme.colors.foreground};
  left: 0;
  
`;

const OptionItem = styled(Button)`
  height: 30px;
  width: 100%;
  text-align: left;
  padding: 0 10px;
  background: none;
  color: ${props => props.theme.colors.background};
`;


const OpenIcon = styled.div`
  position: absolute;
  top: 0;
  padding: 5px 4px;
  border-radius: 50%;
  height: 25px;
  right: 0;
  transition: background ease 0.2s;
  width: 25px;

  &:hover {
    background: ${props => props.theme.colors.secondary}
  }
`;
export default class Select extends PureComponent {
  constructor (props) {
    super(...arguments);
    autobind(this);

    this.state = {
      opened: false
    };
  }
  
  handleOnOptionItemClick (event) {
    event.preventDefault();
    this.props.onChange(event)
  }

  closeOptions () {
    if (this.state.opened) {
      this.setState({ opened: false });
    }
  }

  toggleOpenOptions () {
    this.setState({ opened: !this.state.opened });
  }

  optionItems () {
    const { name, options } = this.props;

    return options && options.map(option => (
      <OptionItem 
        key={option.value}
        value={option.value}
        name={name}
        onClick={this.handleOnOptionItemClick} 
      >
        {option.value}
      </OptionItem>
    ));
  }

  render () {
    const { name, value, onChange } = this.props;

    return (
      <SelectContainer>
        <Input
          onChange={onChange}
          name={name}
          value={value}
          onClick={this.closeOptions}
        />
        <OpenIcon onClick={this.toggleOpenOptions}>
         <Icon src={triangleDown} />
        </OpenIcon>
        <Options open={this.state.opened}>
          {this.optionItems()}
        </Options>
      </SelectContainer>
    );
  }
}
