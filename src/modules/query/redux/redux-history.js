import { IDE_ROUTE } from '../../../constants/routes-constants';
import { query } from '../../../helpers/async-query';

export const register = 'queryHistory';

export const initialState = {
  queryHistoryAll: {}
};

export class SaveQueryHistory {
  action (history) {
    const id = Object.keys(history)[0];
    const data = {
      id,
      ...history[id],
      response: JSON.stringify(history[id].response)
    };

    const request = query({
      url: IDE_ROUTE,
      actions: ['ideQueryHistorySave'],
      query: `mutation (
        $id:        String
        $query:     String
        $variables: String
        $response:  String
      ) {
        ideQueryHistorySave (
          id:        $id
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

    return { type: 'SaveQueryHistory', payload: request };
  }
}

export class AddQueryHistoryItem {
  action (history) {
    return { type: 'AddQueryHistoryItem', payload: history };
  }

  reducer (state, action) {
    return {
      ...state,
      queryHistoryAll: { ...state.queryHistoryAll, ...action.payload }
    };
  }
}

export class createQueryHistory {
  action (history) {
    const data = history.reduce((previous, item) => {
      return {
        ...previous,
        [item.id]: {
          query: item.query,
          response: JSON.parse(item.response),
          variables: item.variables
        }
      };
    }, {});

    return { type: 'createQueryHistory', payload: data };
  }

  reducer (state, action) {
    return {
      ...state,
      queryHistoryAll: { ...state.queryHistoryAll, ...action.payload }
    };
  }
}