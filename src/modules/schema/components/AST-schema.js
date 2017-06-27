import React from 'react';
import Tree from './Tree-schema';

const AST = props => <Tree data={props.schema.ast} />;

export default AST;
