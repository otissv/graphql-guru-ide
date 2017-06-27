import React from 'react';
import PersistedEditor from '../components/Editor-persisted';
import PersistedContainer from '../containers/container-persisted';

export default props => (
  <PersistedContainer {...props} component={PersistedEditor} />
);
