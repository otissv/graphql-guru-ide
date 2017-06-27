import React from 'react';
import axios from 'axios';
import autobind from 'class-autobind';
import { connect } from '../../../remodule';
import getClassMethods from '../../../helpers/get-class-methods';
import { buildClientSchema, parse, print } from 'graphql';
import cuid from 'cuid';
import { initialState } from '../redux/redux-query';

class GraphiQLContainer extends React.Component {
  constructor () {
    super(...arguments);
    autobind(this);

    this.query = {
      id: null,
      collection: '',
      description: '',
      name: '',
      query: '',
      variables: ''
    };
  }

  componentWillMount () {
    const {
      endpoint,
      createCollections,
      createQueryHistory,
      getGraphqlSchema,
      getQueries,
      setGraphqlSchema,
      setQueryResultsStatus
    } = this.props;

    if (endpoint && endpoint.trim() !== '') {
      // fetch graphql schema
      getGraphqlSchema(endpoint).payload
        .then(response => {
          if (response.data && response.data.__schema) {
            setGraphqlSchema(response.data);
            setQueryResultsStatus('Waiting...');
          }
        })
        .catch(error => console.log(error));

      // fetch queries and history from server
      getQueries().payload
        .then(response => {
          if (response.data.ideQueryFindAll) {
            createCollections(response.data.ideQueryFindAll);
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

  fetchGraphQL (graphQLParams) {
    if (graphQLParams.query === '') {
      return Promise.resolve('Please provide a query.');
    } else {
      const {
        endpoint,
        addQueryHistoryItem,
        setSelectedQuery,
        saveQueryHistory,
        selectedQuery
      } = this.props;

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

          const history = {
            query: graphQLParams.query,
            response: results.response.data,
            variables: graphQLParams.variables
          };

          const date = Date.parse(new Date());

          setSelectedQuery({
            ...selectedQuery,
            ...this.query,
            results
          });
          addQueryHistoryItem({ [date]: history });
          saveQueryHistory({ [date]: history });

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
    const { setSelectedQuery, selectedQuery } = this.props;

    const query = this.query.query.trim() !== ''
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

  handleChangeQueryName (event) {
    this.query.name = event.nativeEvent.target.value;
  }

  handleChangeQueryDescription (event) {
    this.query.description = event.nativeEvent.target.value;
  }

  handleChangeCollection (selectObject) {
    this.query.collection = selectObject;
    this.forceUpdate();
  }

  handleChangeInputCollection (selectObject) {
    this.query.collection = selectObject;
    this.forceUpdate();
  }

  handleClickRest () {
    this.query = {
      id: null,
      collection: '',
      description: '',
      name: '',
      query: '',
      variables: ''
    };

    this.props.resetQuery();
    this.forceUpdate();
  }

  handleClickSave (event) {
    const {
      addCollection,
      createQuery,
      selectedQuery,
      setSelectedQuery,
      setSaveModal
    } = this.props;

    const data = {
      ...this.query,
      collection: this.query.collection.value,
      description: document.getElementById('save-description').value,
      id: selectedQuery.id || cuid(),
      name: document.getElementById('save-name').value,
      results: JSON.stringify(selectedQuery.results)
    };

    if (!this.validateSaveModule(data)) {
      console.log(this.saveErrors);
      console.log('validation error');
    } else {
      setSelectedQuery(data);
      addCollection(data);
      createQuery(data).payload
        .then(response => {
          if (response.data.ideQueryCreate.RESULTS_.result === 'failed') {
          }
        })
        .catch(error => console.log(error));
      setSaveModal(false);
    }
  }

  validateSaveModule (data) {
    const errors = {};
    const { collection, name, query } = data;

    if (collection == null || collection.trim() === '') {
      errors.collection = true;
    }

    if (name == null || name.trim() === '') {
      console.log(name);
      errors.name = true;
    }
    if (query == null || query.trim() === '') {
      errors.query = true;
    }

    return Object.keys(errors).length !== 0;
  }

  handleClickUpdate () {
    const {
      addCollection,
      createQuery,
      selectedQuery,
      setSelectedQuery
    } = this.props;

    const data = { ...selectedQuery, ...this.query };

    setSelectedQuery(data);
    addCollection(data);
    createQuery(data).payload
      .then(response => {
        if (response.data.ideQueryCreate.RESULTS_.result === 'failed') {
        }
      })
      .catch(error => console.log(error));
  }

  toggleSidebarQueryContent (event) {
    const target = event.nativeEvent.target;
    const parent = event.nativeEvent.target.parentNode;
    const contentType = target.dataset.button || parent.dataset.button;
    this.props.changeSidebarQueryContent(contentType);
  }

  handleQueryCollectionItemClick (event) {
    if (event.nativeEvent.target.tagName.toUpperCase() === 'BUTTON') return;

    const { queryCollectionAll, selectedQuery, setSelectedQuery } = this.props;
    const target = event.nativeEvent.target;
    const id = target.dataset.kitid;
    const collection =
      target.parentNode.dataset.collection || target.dataset.collection;
    const query = queryCollectionAll[collection][id];

    if (query.id !== selectedQuery.id) {
      this.query = {
        collection: query.collection,
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
      queryHistoryAll,
      initialState,
      setQueryResultsStatus,
      setSelectedQuery
    } = this.props;

    const target = event.nativeEvent.target;
    const id = target.dataset.kitid;
    const history = queryHistoryAll[id];

    const data = {
      ...initialState.query.selectedQuery,
      query: history.query,
      variables: history.variables || '',
      results: {
        ...initialState.query.selectedQuery.results,
        response: history.response
      }
    };

    this.query.query = data.query;
    this.query.variables = data.variables;

    setSelectedQuery(data);
    setQueryResultsStatus('Waiting');
  }

  prettyQuery (query) {
    return print(parse(query));
  }

  setSaveModal (bool) {
    this.props.setSaveModal(bool);
  }

  setInfoModal (bool) {
    this.props.setInfoModal(bool);
  }

  render () {
    const {
      component,
      gqlTheme,
      gqlThemePaper,
      selectedQuery,
      uiQuery
    } = this.props;

    const query = selectedQuery &&
      selectedQuery.query &&
      selectedQuery.query.trim() !== ''
      ? this.prettyQuery(selectedQuery.query)
      : '';

    const variables = selectedQuery && selectedQuery.variables;
    const Component = component;
    const schema = this.buildSchema();

    const _response =
      JSON.stringify(selectedQuery.results.response, null, 2) || '';
    const response = _response.trim() === '' ||
      _response === '{}' ||
      _response === '""'
      ? null
      : _response;

    return (
      <div
        className={`graphiql-theme ${gqlTheme} ${gqlThemePaper ? 'paper' : ''}`}
      >
        <Component
          ui={uiQuery}
          {...getClassMethods(this)}
          fetcher={this.fetchGraphQL}
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
          selectedQuery={selectedQuery}
          values={this.query}
          queryCollection={this.query.collection}
        />
      </div>
    );
  }
}

export default connect(GraphiQLContainer);
