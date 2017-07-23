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
      persistedHistoryAll: { ...state.persistedHistoryAll, ...action.payload }
    };
  }
}

export class AddPersistedHistoryItem {
  action (history) {
    return { type: 'PersistedHistoryAllReducer', payload: history };
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
    const data = history.reduce((previous, item) => {
      return {
        ...previous,
        [item.id]: {
          persisted: item.persisted,
          response: JSON.parse(item.response),
          variables: item.variables
        }
      };
    }, {});

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
    const id = Object.keys(history)[0];
    const data = {
      id,
      ...history[id],
      response: JSON.stringify(history[id].response)
    };

    const request = query({
      url: IDE_ROUTE,
      actions: ['idePersistedHistorySave'],
      query: `mutation (
        $id:        String
        $persisted:     String
        $variables: String
        $response:  String
      ) {
        idePersistedHistorySave (
          id:        $id
          persisted:     $persisted
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
