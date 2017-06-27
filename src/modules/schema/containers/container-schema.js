import React from 'react';
import autobind from 'class-autobind';
import { connect } from '../../../remodule';
import getClassMethods from '../../../helpers/get-class-methods';

class SchemaContainer extends React.Component {
  constructor () {
    super(...arguments);
    autobind(this);
  }

  componentWillMount () {
    const { getSchema, setSchema } = this.props;

    getSchema().payload
      .then(response => setSchema(response.data.schema))
      .catch(error => console.log(error));
  }

  render () {
    const Component = this.props.component;

    return <Component {...getClassMethods(this)} />;
  }
}

export default connect(SchemaContainer);
