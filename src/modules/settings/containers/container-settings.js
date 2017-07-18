import React, { PureComponent } from 'react';
import autobind from 'class-autobind';
import { connect } from '../../../store';
import getClassMethods from '../../../helpers/get-class-methods';
import Settings from '../components/Settings';

class SettingsContainer extends PureComponent {
  constructor (props) {
    super(...arguments);
    autobind(this);
  }

  handleClickSaveSettings (values) {
    this.props.clearSettingsHistory({
      persistedHistory: values.clearPersistedHistory,
      queryCollection: values.clearQueryCollection,
      queryHistory: values.clearQueryHistory
    });

    values.clearPersistedHistory &&
      this.props.selectedPersistedToInitialState();
    values.clearQueryCollection && this.props.queryCollectionsToInitialState();
    values.clearQueryHistory && this.props.queryHistoryAllToInitialState({});
    this.props.resetForm('settingsForm');
    this.props.setSettingsModal(false);
  }

  setSettingsModal (bool) {
    this.props.setSettingsModal(bool);
  }

  validation (data) {
    const errors = {};
    const { name } = data;

    if (this.query.collection == null || this.query.collection.trim() === '') {
      errors.collection = 'Please enter a collection name';
    }

    if (name == null || name.trim() === '') {
      errors.name = 'Please enter a query name';
    }
    return Object.keys(errors).length !== 0 ? errors : null;
  }

  render () {
    return <Settings {...getClassMethods(this)} />;
  }
}

export default connect(SettingsContainer);
