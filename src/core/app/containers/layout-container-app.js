import React from 'react';
import autobind from 'class-autobind';
import getClassMethods from '../../../helpers/get-class-methods';
import { connect } from '../../../remodule';

class LayoutContainer extends React.Component {
  constructor () {
    super(...arguments);
    autobind(this);
  }

  render () {
    const Component = this.props.component;

    return <Component {...getClassMethods(this)} />;
  }
}

export default connect(LayoutContainer);
