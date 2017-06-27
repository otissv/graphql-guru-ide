import React from 'react';
import axios from 'axios';
import autobind from 'class-autobind';
import { connect } from '../../../remodule';
import getClassMethods from '../../../helpers/get-class-methods';

class PersistedContainer extends React.PureComponent {
  constructor () {
    super(...arguments);
    autobind(this);
  }

  componentWillMount () {
    const { getPersisted, setPersisted } = this.props;

    // getPersisted().payload
    //   .then(response => setPersisted(response.data.Persisted))
    //   .catch(error => console.log(error));
  }

  fetchGraphql () {
    const { endpoint, selectedPersisted, setSelectedPersisted } = this.props;

    if (selectedPersisted.query.trim() === '') {
      setSelectedPersisted({ result: 'Please provide a persisted query.' });
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
        data: JSON.parse(selectedPersisted.query)
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

          // const history = {
          //   query: graphQLParams.query,
          //   response: results.response.data,
          //   variables: graphQLParams.variables
          // };

          // const date = Date.parse(new Date());

          setSelectedPersisted({
            ...selectedPersisted,
            ...this.query,
            results
          });
          // addHistoryItem({ [date]: history });
          // saveHistory({ [date]: history });

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

  handleOnChangeQuery (value) {
    try {
      this.props.setSelectedPersisted({ query: value });
    } catch (error) {
      console.log(error);
    }
  }

  handlePrettifyClick () {}

  handleSaveClick () {}

  handleResetClick () {
    this.props.resetPersisted();
  }

  handleOnChangeRequest (value) {}

  render () {
    const Component = this.props.component;

    return <Component {...getClassMethods(this)} />;
  }
}

export default connect(PersistedContainer);
