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
      persistedCollection: values.clearPersistedCollection,
      persistedHistory: values.clearPersistedHistory,
      queryCollection: values.clearRequestCollection,
      queryHistory: values.clearRequestHistory
    });

    values.clearPersistedCollection &&
      this.props.persistedCollectionAllToInitialState();
    values.clearPersistedHistory &&
      this.props.persistedHistoryAllToInitialState();
    values.clearRequestCollection && this.props.queryCollectionAllToInitialState();
    values.clearRequestHistory && this.props.queryHistoryAllToInitialState({});
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
