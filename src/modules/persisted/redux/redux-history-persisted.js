import { IDE_ROUTE } from '../../../constants/routes-constants';
import { query } from '../../../helpers/async-query';

export const register = 'persistedHistory';

export const initialState = {
  persistedHistoryAll: {}
};

export class PersistedHistoryAllReducer {
  reducer (state, action) {
    return {
      ...state,
      persistedHistoryAll: { 
        ...state.persistedHistoryAll,
        ...action.payload
      }
    };
  }
}

export class AddPersistedHistoryItem {
  action (history) {
    const date = Date.parse(new Date());

    return {
      type: 'PersistedHistoryAllReducer', 
      payload: { [date]: history }
    };
  }
}

export class ClearPersistedHistoryItem {
  action (history) {
    return {
      type: 'PersistedHistoryAllReducer',
      payload: initialState.persistedHistoryAll
    };
  }
}

export class CreatePersistedHistory {
  action (history) {
    const data = history.reduce((previous, item) => ({
      ...previous,
      [item.id]: item
    }), {});

    return { type: 'PersistedHistoryAllReducer', payload: data };
  }
}

export class PersistedHistoryAllToInitialState {
  action () {
    return {
      type: 'PersistedHistoryAllToInitialState',
      payload: {}
    };
  }

  reducer (state, action) {
    return {
      ...state,
      persistedHistoryAll: initialState.persistedHistoryAll
    };
  }
}

export class SavePersistedHistory {
  action (history) {
    const date = Date.parse(new Date());

    const data = {
      id: date,
      ...history,
      response: JSON.stringify(history.response)
    };

    const request = query({
      url: IDE_ROUTE,
      actions: ['idePersistedHistorySave'],
      query: `mutation (
        $id:        String
        $endpoint:  String
        $query:     String
        $variables: String
        $response:  String
      ) {
        idePersistedHistorySave (
          id:        $id
          endpoint:  $endpoint
          query:     $query
          variables: $variables
          response:  $response
        ) {
          RESULTS_ {
            result
          }
        }
      }`,
      variables: JSON.stringify(data)
    });

    return { type: 'SavePersistedHistory', payload: request };
  }
}
