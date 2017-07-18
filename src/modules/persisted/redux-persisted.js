import { IDE_ROUTE } from '../../constants/routes-constants';
import { query } from '../../helpers/async-query';
import merge from 'deepmerge';

export const register = 'persisted';

export const initialState = {
  selectedPersisted: {
    name: '',
    description: '',
    collection: '',
    query: '',
    results: {
      request: {},
      headers: {},
      status: '',
      time: '',
      response: null
    }
  },
  persistedAll: {}
};

export class CreatePersisted {
  action (data) {
    const obj = {
      ...data,
      results: JSON.stringify(data.results)
    };

    const request = query({
      url: IDE_ROUTE,
      actions: ['idePersistedCreate'],
      query: `mutation (
        $id:        String
        $fragments: String
        $query:     String
        $variables:  String
      ) {
        idePersistedCreate (
          id:        $String
          fragments: $fragments
          query:     $query
          variables: $variables
        ) {
          id
          fragments
          query
          variables
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

    return { type: 'z', payload: request };
  }
}

export class GetPersisted {
  action () {
    const request = query({
      url: IDE_ROUTE,
      actions: ['idePersistedFindAll'],
      query: `query {
        idePersistedFindAll {
          id
          fragments
          query
          variables
          RESULTS_ {
            result
            error {
              message
            }
          }
        }
      }`
    });

    return { type: 'GetQueries', payload: request };
  }
}

export class selectedPersistedToInitialState {
  action () {
    return {
      type: 'SetSelectedPersisted',
      payload: initialState.selectedPersisted
    };
  }
}

export class SetSelectedPersisted {
  action (query) {
    return { type: 'SetSelectedPersisted', payload: query };
  }

  reducer (state, action) {
    const payload = action.payload || initialState.selectedPersisted;

    return {
      ...state,
      selectedPersisted: merge(state.selectedPersisted, payload)
    };
  }
}
