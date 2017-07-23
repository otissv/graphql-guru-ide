import { IDE_ROUTE } from '../../../constants/routes-constants';
import { query } from '../../../helpers/async-query';

export const register = 'persisted';

export const initialState = {
  uiPersisted: {
    isSaveModalOpen: false,
    isInfoModalOpen: false
  },
  sidebarPersistedContent: 'history',
  selectedPersisted: {
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

export class ChangeSidebarPersistedContent {
  action (contentType) {
    return { type: 'ChangeSidebarPersistedContent', payload: contentType };
  }

  reducer (state, action) {
    return { ...state, sidebarPersistedContent: action.payload };
  }
}

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

    return { type: 'CreatePersisted', payload: request };
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

    return { type: 'GetPersisted', payload: request };
  }
}

export class selectedPersistedToInitialState {
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

export class SetSelectedPersisted {
  action (query) {
    return { type: 'SetSelectedPersisted', payload: query };
  }

  reducer (state, action) {
    return { ...state, selectedPersisted: action.payload };
  }
}

export class SetPersistedResultsStatus {
  action (query) {
    return { type: 'SetPersistedResultsStatus', payload: query };
  }

  reducer (state, action) {
    return {
      ...state,
      selectedPersisted: {
        ...state.selectedPersisted,
        results: {
          ...state.selectedPersisted.results,
          status: action.payload
        }
      }
    };
  }
}

export class SetPersistedSaveModel {
  action (bool) {
    return { type: 'SetPersistedSaveModel', payload: bool };
  }

  reducer (state, action) {
    return {
      ...state,
      uiPersisted: { ...state.uiPersisted, isSaveModalOpen: action.payload }
    };
  }
}

export class SetPersistedInfoModal {
  action (bool) {
    return { type: 'SetPersistedInfoModal', payload: bool };
  }

  reducer (state, action) {
    return {
      ...state,
      uiPersisted: { ...state.uiPersisted, isInfoModalOpen: action.payload }
    };
  }
}
