import { IDE_ROUTE } from '../../../constants/routes-constants';
import { query } from '../../../helpers/async-query';

export const register = 'persisted';

export const initialState = {
  uiPersistedEditor: {
    isSaveModalOpen: false,
    isInfoModalOpen: false,
    sidebarPersistedContent: 'history'
  },
  selectedPersisted: {
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
      response: '',
      status: 'Waiting...',
      time: ''
    }
  }
};

const IDE_PERSISTENT_FRAGMENT = `
  fragment idePersisted on IdePersisted {
    id
    collection
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
        $id:          String
        $collection:  String
        $description: String
        $endpoint:    String
        $name:        String
        $query:       String
        $variables:   String
        $results:     String
      ) {
        idePersistedCreate (
        id:          $id
        collection:  $collection
        description: $description
        endpoint:    $endpoint
        name:        $name
        query:       $query
        variables:   $variables
        results:     $results
        ) {
          ...idePersisted
        }
      }
      ${IDE_PERSISTENT_FRAGMENT}`,
      variables: JSON.stringify(obj)
    });

    return { type: 'CreatePersisted', payload: request };
  }
}

export class GetPersisted {
  action () {
    const request = query({
      url: IDE_ROUTE,
      actions: ['idePersistedFindAll', 'idePersistedHistoryFindAll'],
      query: `query {
        idePersistedFindAll {
          ...idePersisted
        }
        idePersistedHistoryFindAll {
          id
          endpoint
          query
          variables
          response
          RESULTS_ {
            result
            error {
              type
              message
            }
          }
        }
      }
     ${IDE_PERSISTENT_FRAGMENT}`
    });

    return { type: 'GetPersisted', payload: request };
  }
}

export class SelectedPersistedToInitialState {
  action () {
    return {
      type: 'SetSelectedPersisted',
      payload: initialState.selectedPersisted
    };
  }

  reducer (state, action) {
    return { ...state, selectedPersisted: action.payload };
  }
}

export class SetPersistedResultProps {
  action (query) {
    return { type: 'SetPersistedResultProps', payload: query };
  }

  reducer (state, action) {
    return {
      ...state,
      selectedPersisted: {
        ...state.selectedPersisted,
        results: {
          ...state.selectedPersisted.results,
          ...action.payload
        }
      }
    };
  }
}

export class SetSelectedPersisted {
  action (query) {
    return { type: 'SetSelectedPersisted', payload: query };
  }

  reducer (state, action) {
    return { ...state, selectedPersisted: action.payload };
  }
}

export class SetSelectedPersistedProps {
  action (obj) {
    return { type: 'SetSelectedPersistedProps', payload: obj };
  }

  reducer (state, action) {
    if (action.type === 'SetSelectedPersistedProps') {

      return {
        ...state,
        selectedPersisted: {
          ...state.selectedPersisted,
          ...action.payload
        }
      };
    
    } else {
      return state;
    }
  }
}

export class SetUiPersistedProps {
  action (obj) {
    return { type: 'SetUiPersistedProps', payload: obj };
  }

  reducer (state, action) {
    if (action.type === 'SetUiPersistedProps') {
      return {
        ...state,
        uiPersistedEditor: {
          ...state.uiPersistedEditor,
          ...action.payload
        }
      };
    
    } else {
      return state;
    }
  }
}
