import React from 'react';
import axios from 'axios';
import autobind from 'class-autobind';
import { connect } from '../../../store';
import getClassMethods from '../../../helpers/get-class-methods';
import cuid from 'cuid';
import { initialState } from '../redux/redux-persisted';
import { initialState as formsInitialState } from '../../forms/redux/redux-forms';

class PersistedContainer extends React.PureComponent {
  constructor () {
    super(...arguments);
    autobind(this);

    this.persisted = {
      query: '',
      collection: { value: this.props.forms.saveForm.fields.collection.value },
      variables: ''
    };
  }

  componentWillMount () {
    const {
      createPersistedCollections,
      createPersistedHistory,
      getPersisted,
      selectedPersisted
    } = this.props;

    const endpoint = selectedPersisted.endpoint;

    if (endpoint && endpoint.trim() !== '') {
      // fetch graphql schema
      this.getGraphQLSchema(endpoint);

      // fetch queries and history from server
      getPersisted().payload
        .then(response => {
          if (response.data.idePersistedFindAll) {
            createPersistedCollections(response.data.idePersistedFindAll);
          }

          if (response.data.idePersistedHistoryFindAll) {
            createPersistedHistory(response.data.idePersistedHistoryFindAll);
          }
        })
        .catch(error => console.log(error));
    }
  }

  fetcher () {
    const { 
      addPersistedHistoryItem,
      savePersistedHistory,
      selectedPersisted,
      setSelectedPersisted,
      setPersistedResultProps
    } = this.props;
    const endpoint = selectedPersisted.endpoint;

    if (selectedPersisted.query.trim() === '') {
      setPersistedResultProps({ response: 'Please provide a persisted query.' });
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
        data: {
          query: JSON.parse(selectedPersisted.query),
          variables: selectedPersisted.variables
        }
      })
        .then(response => {
          const responseData = response.data;

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
            code: 200,
            time: `${new Date().getTime() - startResponseTime}`,
            response: responseData
          };

          this.persisted.query = selectedPersisted.query;

          const data = {
            endpoint,
            query: selectedPersisted.query,
            variables: selectedPersisted.variables,
            results
          };
  
          setSelectedPersisted({
            ...selectedPersisted,
            ...this.persisted,
            ...data
          });

          addPersistedHistoryItem(data);
          savePersistedHistory(data);

          return response.data.data;
        })
        .catch(error => {
          if (error.response) {
            console.log(error.response);
            // Response status code 2xx
            setPersistedResultProps({
              response: error.response.data,
              status: `${error.response.status} failed`,
              code: parseInt(error.response.code, 10),
              headers: error.response.headers
            });
          } else if (error.request) {
            // No response was received
            console.log(error.request);
            setPersistedResultProps({
              response:  error.response.data,
              status: '502 failed...',
              code: 502,
              headers: {}
            });
            
          } else {
            console.log(error);
            setPersistedResultProps({
              response: 'Connection failed',
              status:'500 failed',
              code: 500,
              headers: {}
            });
          }
        });
    }
  }

  getGraphQLSchema (endpoint) {
    const {
      getGraphqlSchema,
      selectedPersisted,
      setGraphqlSchema,
      setSchemaIsConnected
    } = this.props;

    if (endpoint !== selectedPersisted.endpoint) {
      getGraphqlSchema(endpoint).payload
        .then(response => {
          if (response.data && response.data.__schema) {
            setGraphqlSchema(response.data);
            setSchemaIsConnected(true);
          }
        })
        .catch(error => {
          console.log(error);
          setGraphqlSchema({});
          setSchemaIsConnected(false);
        });
    }
  }

  handleClickPrettify (event) {
    const { setSelectedPersisted, selectedPersisted } = this.props;

    const persisted = selectedPersisted.query;

    let prettyText = persisted
      .replace('[', '[\n\t')
      .replace('{', '{\n\t')
      .replace('}', '}\n')
      .replace(',', ',\n');
    prettyText = JSON.stringify(prettyText, null, 2);


    setSelectedPersisted({
      ...selectedPersisted,
      query: JSON.parse(prettyText)
    });
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
      collection: { value: '' },
      persisted: '',
      variables: ''
    };

    this.props.selectedPersistedToInitialState();
    this.forceUpdate();
    this.props.resetForm('saveForm');
  }

  openSaveModel (bool) {
    const { selectedPersisted, setPersistedResultProps, setUiPersistedProps } = this.props; 

    if (selectedPersisted.query.trim() === '') {
      setPersistedResultProps({ response: 'Please provide a persisted query.' });
    } else {
      setUiPersistedProps({ isSaveModalOpen: bool });
    }
  }

  openInfoModal (bool) {
    this.props.setUiPersistedProps({ isInfoModalOpen: bool });
  }

  handleClickSave (values) {
    const {
      addPersistedCollection,
      createPersisted,
      resetForm,
      selectedPersisted,
      setSelectedPersisted,
      setUiPersistedProps
    } = this.props;

    const { name, description } = values;

    const data = {
      ...selectedPersisted,
      ...this.persisted,
      collection: this.persisted.collection.value,
      description,
      name,
      query: this.persisted.query,
      id: selectedPersisted.id || cuid(),
      results: JSON.stringify(selectedPersisted.results)
    };

    setSelectedPersisted(data);
    addPersistedCollection(data);
    createPersisted(data).payload
      .then(response => {
        if (response.data.idePersistedCreate.RESULTS_.result === 'failed') {
        }
      })
      .catch(error => console.log(error));
    setUiPersistedProps({ isSaveModalOpen: false });
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
    this.props.setUiPersistedProps({ sidebarPersistedContent: 'collection' });
  }

  showSidebarPersistedHistory (event) {
    this.props.setUiPersistedProps({ sidebarPersistedContent: 'history' });
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
      setPersistedResultProps,
      setSelectedPersisted
    } = this.props;

    const target = event.nativeEvent.target;
    const id = target.dataset.kitid;
    const history = persistedHistoryAll[id];

    const data = {
      ...initialState.persisted.selectedPersisted,
      ...history,
      results: {
        ...initialState.persisted.selectedPersisted.results,
        response: history.response
      }
    };

    this.persisted.query = data.persisted;
    this.persisted.variables = data.variables;

    setSelectedPersisted(data);
    setPersistedResultProps({ status: 'Waiting' });
  }

  handleOnChangePersisted (value) {
    this.props.setSelectedPersistedProps({ query: value });
  }

  handleOnVariableChange (value) {
    this.props.setSelectedPersistedProps({ variables: value });
  }

  handleOnChangeRequest (value) {}

  render () {
    const Component = this.props.component;

    return <Component {...getClassMethods(this)} />;
  }
}

export default connect(PersistedContainer);
