import React from 'react';
import axios from 'axios';
import autobind from 'class-autobind';
import { connect } from '../../../store';
import { parse, print } from 'graphql';
import getClassMethods from '../../../helpers/get-class-methods';
import cuid from 'cuid';
import { initialState } from '../redux/redux-persisted';
import { initialState as formsInitialState } from '../../forms/redux/redux-forms';

class PersistedContainer extends React.PureComponent {
  constructor () {
    super(...arguments);
    autobind(this);
  }

  componentWillMount () {
    // const { getPersisted, setPersisted } = this.props;
    // getPersisted().payload
    //   .then(response => setPersisted(response.data.Persisted))
    //   .catch(error => console.log(error));
  }

  fetchGraphql () {
    const { selectedPersisted, setSelectedPersisted } = this.props;
    const endpoint = selectedPersisted.endpoint;

    if (selectedPersisted.persisted.trim() === '') {
      setSelectedPersisted({ result: 'Please provide a persisted persisted.' });
      return;
    } else {
      // axios defaults
      axios.defaults.baseURL = endpoint;
      axios.defaults.headers.post['Content-Type'] =
        'application/x-www-form-urlencoded';

      const axiosConfig = {
        url: endpoint,
        method: 'POST'
      };

      const startResponseTime = new Date().getTime();

      return axios({
        ...axiosConfig,
        data: JSON.parse(selectedPersisted.persisted)
      })
        .then(response => {
          console.log(response.data);
          const results = {
            request: {
              data: response.config.data,
              headers: response.config.headers,
              method: 'POST',
              url: response.config.url,
              xsrfCookieName: response.config.xsrfCookieName,
              xsrfHeaderName: response.config.xsrfHeaderName
            },

            headers: response.headers,
            status: `${response.status} ${response.statusText}`,
            time: `${new Date().getTime() - startResponseTime}`,
            response: response.data
          };

          setSelectedPersisted({
            ...selectedPersisted,
            ...this.persisted,
            results
          });

          return response.data.data;
        })
        .catch(error => {
          if (error.response) {
            // Response status code 2xx
            this.setState({
              response: error.response.data,
              status: `${error.response.status} failed`,
              headers: error.response.headers
            });
          } else if (error.request) {
            // No response was received
            console.log(error.request);
          }
        });
    }
  }

  handleClickPrettify (event) {
    const { setSelectedPersisted, selectedPersisted } = this.props;

    const persisted =
      this.persisted.persisted.trim() !== ''
        ? this.persisted.persisted.trim()
        : selectedPersisted.persisted;

    const prettyText = this.prettyPersisted(persisted);
    setSelectedPersisted({
      ...selectedPersisted,
      persisted: prettyText
    });
  }

  handelOnEditPersisted (persisted) {
    this.persisted.persisted = persisted;
  }

  handelOnEditVariables (variables) {
    this.persisted.variables = variables;
  }

  handleChangeCollection (selectObject) {
    this.persisted.collection = selectObject;
    this.forceUpdate();
  }

  handleChangeInputCollection (selectObject) {
    this.persisted.collection = selectObject;
    this.forceUpdate();
  }

  handleClickRest () {
    this.persisted = {
      id: null,
      collection: { value: '' },
      persisted: '',
      variables: ''
    };

    this.props.selectedPersistedToInitialState();
    this.forceUpdate();
    this.props.resetForm('saveForm');
  }

  openSaveModel () {
    this.props.setForms({
      saveForm: {
        ...formsInitialState.forms.saveForm,
        fields: {
          ...formsInitialState.forms.saveForm.fields,
          name: { value: this.props.selectedPersisted.name },
          collection: this.persisted.collection
        }
      }
    });

    this.props.setPersistedSaveModel(true);
  }

  handleClickSave (values) {
    const {
      addCollection,
      createPersisted,
      resetForm,
      selectedPersisted,
      setSelectedPersisted,
      setPersistedSaveModel
    } = this.props;

    const { name, description } = values;

    const data = {
      ...this.persisted,
      collection: this.persisted.collection.value,
      description,
      name,
      id: selectedPersisted.id || cuid(),
      results: JSON.stringify(selectedPersisted.results)
    };

    setSelectedPersisted(data);
    addCollection(data);
    createPersisted(data).payload
      .then(response => {
        if (response.data.idePersistedCreate.RESULTS_.result === 'failed') {
        }
      })
      .catch(error => console.log(error));
    setPersistedSaveModel(false);
    resetForm('saveForm');
  }

  validateSaveModule (data) {
    const errors = {};
    const { name } = data;

    if (
      this.persisted.collection.value == null ||
      this.persisted.collection.value.trim() === ''
    ) {
      errors.collection = 'Please enter a collection name';
    }

    if (name == null || name.trim() === '') {
      errors.name = 'Please enter a persisted name';
    }
    return Object.keys(errors).length !== 0 ? errors : null;
  }

  showSidebarPersistedCollection (event) {
    this.props.changeSidebarPersistedContent('collection');
  }

  showSidebarPersistedHistory (event) {
    this.props.changeSidebarPersistedContent('history');
  }

  handlePersistedCollectionItemClick (event) {
    if (event.nativeEvent.target.tagName.toUpperCase() === 'BUTTON') return;

    const {
      persistedCollectionAll,
      selectedPersisted,
      setSelectedPersisted
    } = this.props;
    const target = event.nativeEvent.target;
    const id = target.dataset.kitid;
    const collection =
      target.parentNode.dataset.collection || target.dataset.collection;
    const persisted = persistedCollectionAll[collection][id];

    if (persisted.id !== selectedPersisted.id) {
      this.persisted = {
        collection: { value: persisted.collection },
        description: persisted.description,
        id: persisted.id,
        name: persisted.name,
        persisted: persisted.persisted,
        variables: persisted.variables
      };

      setSelectedPersisted({
        ...persisted,
        results: {
          ...persisted.results,
          status: 'Waiting...',
          time: null
        }
      });
    } else {
      setSelectedPersisted({
        ...persisted,
        results: initialState.selectedPersisted.results
      });
    }
  }

  handlePersistedHistoryItemClick (event) {
    const {
      persistedHistoryAll,
      initialState,
      setPersistedResultsStatus,
      setSelectedPersisted
    } = this.props;

    const target = event.nativeEvent.target;
    const id = target.dataset.kitid;
    const history = persistedHistoryAll[id];

    const data = {
      ...initialState.persisted.selectedPersisted,
      persisted: history.persisted,
      variables: history.variables || '',
      results: {
        ...initialState.persisted.selectedPersisted.results,
        response: history.response
      }
    };

    this.persisted.persisted = data.persisted;
    this.persisted.variables = data.variables;

    setSelectedPersisted(data);
    setPersistedResultsStatus('Waiting');
  }

  prettyPersisted (query) {
    return print(parse(query));
  }

  handleOnChangePersisted (value) {
    try {
      this.props.setSelectedPersisted({ persisted: value });
    } catch (error) {
      console.log(error);
    }
  }

  handleOnChangeRequest (value) {}

  render () {
    const Component = this.props.component;

    return <Component {...getClassMethods(this)} />;
  }
}

export default connect(PersistedContainer);
