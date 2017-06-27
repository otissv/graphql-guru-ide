import React from 'react';
import autobind from 'class-autobind';
import { connect } from '../../../remodule';
import getClassMethods from '../../../helpers/get-class-methods';

class GraphiQLContainer extends React.Component {
  constructor () {
    super(...arguments);
    autobind(this);
  }

  render () {
    const Component = this.props.component;
    return <Component {...getClassMethods(this)} />;
  }
}

export default connect(GraphiQLContainer);
