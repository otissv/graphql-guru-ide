import React from 'react';
import Graphiql from '../components/GraphiQL-query';
import GraphiqlContainer from '../containers/container-query';

const GraphiqlView = () => <GraphiqlContainer component={Graphiql} />;

export default GraphiqlView;
