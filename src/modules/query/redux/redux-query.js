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

export class SetSaveModal {
  action (bool) {
    return { type: 'SetSaveModal', payload: bool };
  }

  reducer (state, action) {
    return {
      ...state,
      uiQuery: { ...state.uiQuery, isSaveModalOpen: action.payload }
    };
  }
}

export class SetInfoModal {
  action (bool) {
    return { type: 'SetInfoModal', payload: bool };
  }

  reducer (state, action) {
    return {
      ...state,
      uiQuery: { ...state.uiQuery, isInfoModalOpen: action.payload }
    };
  }
}

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
        $name:        String
        $query:       String
        $variables:   String
        $results:     String
      ) {
        ideQueryCreate (
          id:          $id
          collection:  $collection
          description: $description
          name:        $name
          query:       $query
          variables:   $variables
          results:     $results
        ) {
          id
          collection
          created
          description
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
