import axios from 'axios';
import { cleanObj } from 'ufunc';

// make ajax request to graphql server
export function query (args) {
  const { actions, auth, query, url, variables, filter } = args;

  axios.defaults.baseURL = url;
  axios.defaults.headers.common['Authorization'] = JSON.stringify(auth);
  axios.defaults.headers.post['Content-Type'] =
    'application/x-www-form-urlencoded';

  const data = {
    actions,
    filter,
    query: `${query}`,
    variables
  };

  const axiosConfig = {
    url,
    dataType: 'jsonp',
    method: 'POST'
  };

  return axios({ ...axiosConfig, data }).then(response => {
    // handle errors
    if (response.data.message && response.data.message.error) {
      return { error: response.data.message };
    }

    // handle successful response
    const data = actions.reduce((prev, curr) => {
      return {
        ...prev,
        [curr]: response.data.data[curr] != null
          ? cleanObj(response.data.data[curr])
          : null
      };
    }, {});

    return { data };
  });
}
