import { IDE_ROUTE } from '../../../constants/routes-constants';
import { query } from '../../../helpers/async-query';

export const register = 'query';

export const initialState = {
  uiQueryEditor: {
    gqlTheme: 'dracula',
    gqlThemePaper: false,
    isInfoModalOpen: false,
    isSaveModalOpen: false,
    sidebarQueryContent: 'history'
  },
  selectedQuery: {
    id: null,
    collection: '',
    description: '',
    dirty: false,
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

const IDE_QUERY_FRAGMENT = `
  fragment ideQuery on IdeQuery {
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
  }`;

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
          ...ideQuery
        }
      }
      ${IDE_QUERY_FRAGMENT}`,
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
          ...ideQuery
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
      }
      ${IDE_QUERY_FRAGMENT}`
    });

    return { type: 'GetQueries', payload: request };
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

export class SetQueryResultProps {
  action (query) {
    return { type: 'SetQueryResultProps', payload: query };
  }

  reducer (state, action) {
    return {
      ...state,
      selectedQuery: {
        ...state.selectedQuery,
        results: {
          ...state.selectedQuery.results,
          ...action.payload
        }
      }
    };
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

export class SetSelectedQueryProps {
  action (obj) {
    return { type: 'SetSelectedQueryProps', payload: obj };
  }

  reducer (state, action) {
    if (action.type === 'SetSelectedQueryProps') {

      return {
        ...state,
        selectedQuery: {
          ...state.selectedQuery,
          ...action.payload
        }
      };
    
    } else {
      return state;
    }
  }
}

export class SetUiQueryProps {
  action (contentType) {
    return { type: 'SetUiQueryProps', payload: contentType };
  }

  reducer (state, action) {
    return { 
      ...state, 
      uiQueryEditor: { ...state.uiQueryEditor, ...action.payload }
    };
  }
}
