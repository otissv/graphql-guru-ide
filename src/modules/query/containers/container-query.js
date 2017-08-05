import React from 'react';
import axios from 'axios';
import autobind from 'class-autobind';
import { connect } from '../../../store';
import getClassMethods from '../../../helpers/get-class-methods';
import { buildClientSchema, parse, print } from 'graphql';
import cuid from 'cuid';
import { initialState } from '../redux/redux-query';
import { initialState as formsInitialState } from '../../forms/redux/redux-forms';

class GraphiQLContainer extends React.Component {
  constructor () {
    super(...arguments);
    autobind(this);

    this.query = {
      id: null,
      collection: { value: this.props.forms.saveForm.fields.collection.value },
      query: '',
      variables: ''
    };
  }

  componentWillMount () {
    const {
      createQueryCollections,
      createQueryHistory,
      getQueries,
      selectedQuery
    } = this.props;

    const endpoint = selectedQuery.endpoint;

    if (endpoint && endpoint.trim() !== '') {
      // fetch graphql schema
      this.getGraphQLSchema(endpoint);

      // fetch queries and history from server
      getQueries().payload
        .then(response => {
          if (response.data.ideQueryFindAll) {
            createQueryCollections(response.data.ideQueryFindAll);
          }

          if (response.data.ideQueryHistoryFindAll) {
            createQueryHistory(response.data.ideQueryHistoryFindAll);
          }
        })
        .catch(error => console.log(error));
    }
  }

  buildSchema () {
    if (this.props.introspection.__schema) {
      return buildClientSchema(this.props.introspection);
    } else {
      return null;
    }
  }

  fetcher (graphQLParams) {
    if (graphQLParams.query === '') {
      return Promise.resolve('Please provide a query.');
    } else {
      const {
        addQueryHistoryItem,
        saveQueryHistory,
        selectedQuery,
        setQueryResultProps,
        setSelectedQuery
      } = this.props;

      const endpoint = selectedQuery.endpoint;

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
        data: graphQLParams
      })
        .then(response => {
          const payload = {
            endpoint,
            query: graphQLParams.query,
            results: {
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
              response: response.data
            },
            variables: graphQLParams.variables
            ? JSON.stringify(graphQLParams.variables) 
            : ''
          };


          const date = Date.parse(new Date());

          setSelectedQuery({
            ...selectedQuery,
            ...this.query,
            ...payload
          });

          addQueryHistoryItem({
            [date]: payload
          });
          saveQueryHistory({
            [date]: payload
          });

          return response.data.data;
        })
        .catch(error => {
          if (error.response) {
            console.log(error.response);
            // Response status code 2xx
            setQueryResultProps({
              response: error.response.data,
              status: `${error.response.status} failed`,
              code: parseInt(error.response.code, 10),
              headers: error.response.headers
            });
          } else if (error.request) {
            // No response was received
            console.log(error.request);
            setQueryResultProps({
              response:  error.response.data,
              status: '502 failed...',
              code: 502,
              headers: {}
            });
            
          } else {
            console.log(error);
            setQueryResultProps({
              response: 'Connection failed',
              status:'500 failed',
              code: 500,
              headers: {}
            });
          }
        });
    }
  }

  handleClickPrettify (event) {
    const { setSelectedQuery, selectedQuery } = this.props;

    const query =
      this.query.query.trim() !== ''
        ? this.query.query.trim()
        : selectedQuery.query;

    const prettyText = this.prettyQuery(query);
    setSelectedQuery({
      ...selectedQuery,
      query: prettyText
    });
  }

  handelOnEditQuery (query) {
    this.query.query = query;
  }

  handelOnEditVariables (variables) {
    this.query.variables = variables;
  }

  handleClickRest () {
    this.query = {
      id: null,
      collection: { value: '' },
      query: '',
      variables: ''
    };

    this.props.selectedQueryToInitialState();
    this.forceUpdate();
    this.props.resetForm('saveForm');
  }

  setInfoModal (bool) {
    this.props.setUiQueryProps({ isInfoModalOpen: bool });
  }

  setSaveModal (bool) {
    const { selectedQuery, setQueryResultProps, setUiQueryProps, setSaveFormFields, setSelectedQueryProps } = this.props; 

    setSelectedQueryProps({ query: this.query.query });
    setSaveFormFields({
      name: { value: selectedQuery.name },
      collection: { value: selectedQuery.collection },
      description: { value: selectedQuery.description }
    });

    if ((this.query.query === '') && (selectedQuery.query.trim() === '')) {
      setQueryResultProps({ response: 'Please provide a query.' });
    } else {
      setUiQueryProps({ isSaveModalOpen: bool });
    }
  }

  handleClickSave (values) {
    const {
      addQueryCollection,
      createQuery,
      resetForm,
      selectedQuery,
      setSelectedQuery,
      setUiQueryProps
    } = this.props;

    const { collection, description, name } = values;

    const data = {
      ...this.query,
      collection,
      description,
      endpoint: selectedQuery.endpoint,
      id: selectedQuery.id || cuid(),
      name,
      results: JSON.stringify(selectedQuery.results)
    };

    setSelectedQuery(data);
    addQueryCollection(data);
    createQuery(data).payload
      .then(response => {
        if (response.data.ideQueryCreate.RESULTS_.result === 'failed') {
        }
      })
      .catch(error => console.log(error));
    setUiQueryProps({ isSaveModalOpen: false });
    resetForm('saveForm');
  }

  validateSaveModule (data) {
    const errors = {};
    const { name, collection } = data;

    if (collection == null || collection.trim() === '') {
      errors.collection = 'Please enter a collection name';
    }

    if (name == null || name.trim() === '') {
      errors.name = 'Please enter a query name';
    }
    return Object.keys(errors).length !== 0 ? errors : null;
  }

  showSidebarQueryCollection (event) {
    this.props.setUiQueryProps({ sidebarQueryContent: 'collection' });
  }

  showSidebarQueryHistory (event) {
    this.props.setUiQueryProps({ sidebarQueryContent: 'history' });
  }

  handleQueryCollectionItemClick (event) {
    if (event.nativeEvent.target.tagName.toUpperCase() === 'BUTTON') return;

    const { queryCollectionAll, selectedQuery, setSelectedQuery } = this.props;
    const target = event.nativeEvent.target;
    const id = target.dataset.kitid;
    const collection =
      target.parentNode.dataset.collection || target.dataset.collection;
    const query = queryCollectionAll[collection][id];

    this.getGraphQLSchema(query.endpoint);

    if (query.id !== selectedQuery.id) {
      this.query = {
        collection: { value: query.collection },
        description: query.description,
        id: query.id,
        name: query.name,
        query: query.query,
        variables: query.variables
      };

      setSelectedQuery({
        ...query,
        results: {
          ...query.results,
          status: 'Waiting...',
          time: null
        }
      });
    } else {
      setSelectedQuery({
        ...query,
        results: initialState.selectedQuery.results
      });
    }
  }

  handleQueryHistoryItemClick (event) {
    const {
      initialState,
      queryHistoryAll,
      setQueryResultProps,
      setSelectedQuery
    } = this.props;

    const target = event.nativeEvent.target;
    const id = target.dataset.kitid;
    const historyItem = queryHistoryAll[id];

    const data = {
      ...initialState.query.selectedQuery,
      ...historyItem
    };

    this.query.query = data.query;
    this.query.variables = data.variables;

    this.getGraphQLSchema(historyItem.endpoint);

    setSelectedQuery(data);
    setQueryResultProps({ status: 'Waiting' });
  }

  getGraphQLSchema (endpoint) {
    const {
      getGraphqlSchema,
      selectedQuery,
      setGraphqlSchema,
      setSchemaIsConnected
    } = this.props;

    if (endpoint !== selectedQuery.endpoint) {
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

  prettyQuery (query) {
    return print(parse(query));
  }

  getQuery () {
    const { selectedQuery } = this.props;
    if (this.query.query.trim() !== '') {
      return this.prettyQuery(this.query.query);
    } else if (selectedQuery.query && selectedQuery.query.trim() !== '') {
      return this.prettyQuery(selectedQuery.query);
    } else {
      return '';
    }
  }

  render () {
    const { component, uiQueryEditor, selectedQuery } = this.props;
    const { gqlTheme, gqlThemePaper } = uiQueryEditor;

    const query = this.getQuery();

    const variables = selectedQuery ? selectedQuery.variables : '';
    const Component = component;
    const schema = this.buildSchema();

    const _response =
      JSON.stringify(selectedQuery.results.response, null, 2) || '';
    const response =
      _response.trim() === '' || _response === '{}' || _response === '""'
        ? null
        : _response;

    return (
      <div
        className={`graphiql-theme ${gqlTheme} ${gqlThemePaper ? 'paper' : ''}`}
      >
        <Component
          {...getClassMethods(this)}
          query={query}
          response={response}
          variables={variables}
          schema={schema}
          operationName={null}
          storage={null}
          defaultQuery={null}
          onEditQuery={this.handelOnEditQuery}
          onEditVariables={this.handelOnEditVariables}
          onEditOperationName={null}
          getDefaultFieldNames={null}
          editorTheme={gqlTheme}
          resultTheme={gqlTheme}
          result={selectedQuery.results}
          queryCollection={this.query.collection.value}
        />
      </div>
    );
  }
}

export default connect(GraphiQLContainer);
