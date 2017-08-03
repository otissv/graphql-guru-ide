import React from 'react';
import IconStyled from '../Icon-styled';

export default class Icon extends React.PureComponent {
  render () {
    return <IconStyled {...this.props} src={this.props.src} />;
  }
}
