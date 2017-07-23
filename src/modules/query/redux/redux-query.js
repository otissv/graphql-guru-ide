import { IDE_ROUTE } from '../../../constants/routes-constants';
import { query } from '../../../helpers/async-query';

export const register = 'query';

export const initialState = {
  uiQuery: {
    isSaveModalOpen: false,
    isInfoModalOpen: false
  },
  selectedQuery: {
    id: null,
    collection: '',
    description: '',
    endpoint: 'http://localhost:8000/graphql',
    name: '',
    query: '',
    variables: '',
    results: {
      headers: {},
      request: {},
      response: {},
      status: 'Waiting...',
      time: ''
    }
  }
};

export class CreateQuery {
  action (data) {
    const obj = {
      ...data,
      results: JSON.stringify(data.results)
    };

    const request = query({
      url: IDE_ROUTE,
      actions: ['ideQueryCreate'],
      query: `mutation (
        $id:          String
        $collection:  String
        $description: String
        $endpoint:    String
        $name:        String
        $query:       String
        $variables:   String
        $results:     String
      ) {
        ideQueryCreate (
          id:          $id
          collection:  $collection
          description: $description
          endpoint:    $endpoint
          name:        $name
          query:       $query
          variables:   $variables
          results:     $results
        ) {
          id
          collection
          created
          description
          endpoint
          name
          query
          variables
          results
          RESULTS_ {
            result
            error {
              message
            }
          }
        }
      }`,
      variables: JSON.stringify(obj)
    });

    return { type: 'CreateQuery', payload: request };
  }
}

export class GetQueries {
  action () {
    const request = query({
      url: IDE_ROUTE,
      actions: ['ideQueryFindAll', 'ideQueryHistoryFindAll'],
      query: `query {
        ideQueryFindAll {
          id
          collection
          created
          description
          endpoint
          name
          query
          variables
          results
          RESULTS_ {
            result
          }
        }
        ideQueryHistoryFindAll {
          id
          endpoint
          query
          variables
          response
          RESULTS_ {
            result
          }
        }
      }`
    });

    return { type: 'GetQueries', payload: request };
  }
}

export class SetSelectedQuery {
  action (query) {
    return { type: 'SetSelectedQuery', payload: query };
  }

  reducer (state, action) {
    return { ...state, selectedQuery: action.payload };
  }
}

export class SelectedQueryToInitialState {
  action (query) {
    return { type: 'SelectedQueryToInitialState', payload: query };
  }

  reducer (state, action) {
    return { ...state, selectedQuery: initialState.selectedQuery };
  }
}

export class SetQueryResults {
  action (query) {
    return { type: 'SetQueryResults', payload: query };
  }

  reducer (state, action) {
    return {
      ...state,
      selectedQuery: {
        ...state.selectedQuery,
        results: action.payload
      }
    };
  }
}

export class SetQueryEndpoint {
  action (routes) {
    return {
      type: 'SetQueryEndpoint',
      payload: routes
    };
  }

  reducer (state, action) {
    return {
      ...state,
      selectedQuery: {
        ...state.selectedQuery,
        endpoint: action.payload
      }
    };
  }
}

export class SetQueryResultsStatus {
  action (query) {
    return { type: 'SetQueryResultsStatus', payload: query };
  }

  reducer (state, action) {
    return {
      ...state,
      selectedQuery: {
        ...state.selectedQuery,
        results: {
          ...state.selectedQuery.results,
          status: action.payload
        }
      }
    };
  }
}

export class SetQuerySaveModel {
  action (bool) {
    return { type: 'SetQuerySaveModel', payload: bool };
  }

  reducer (state, action) {
    return {
      ...state,
      uiQuery: { ...state.uiQuery, isSaveModalOpen: action.payload }
    };
  }
}

export class SetQueryInfoModal {
  action (bool) {
    return { type: 'SetQueryInfoModal', payload: bool };
  }

  reducer (state, action) {
    return {
      ...state,
      uiQuery: { ...state.uiQuery, isInfoModalOpen: action.payload }
    };
  }
}
