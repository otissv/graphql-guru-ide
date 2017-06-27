import React from 'react';
import AST from '../components/AST-schema';
import SchemaContainer from '../containers/container-schema';

export default props => <SchemaContainer {...props} component={AST} />;
