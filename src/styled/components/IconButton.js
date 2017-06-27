import React from 'react';
import ButtonSquared from '../ButtonSquared-styled';
import Icon from './Icon';

export default class IconButton extends React.PureComponent {
  render () {
    return (
      <ButtonSquared radius="circle" onClick={this.props.onClick}>
        <Icon src={this.props.src} />
      </ButtonSquared>
    );
  }
}
