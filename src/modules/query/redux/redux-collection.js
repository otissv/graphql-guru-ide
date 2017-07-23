import { IDE_ROUTE } from '../../../constants/routes-constants';
import { query } from '../../../helpers/async-query';

export const register = 'queryCollection';
import * as reduxQuery from './redux-query';

export const initialState = {
  queryCollectionAll: {}
};

export class QueryCollectionAllReducer {
  reducer (state, action) {
    return {
      ...state,
      queryCollectionAll: { ...state.queryCollectionAll, ...action.payload }
    };
  }
}

export class UpdateHistory {
  action (history) {
    return { type: 'UpdateHistory', payload: history };
  }

  reducer (state, action) {
    return { ...state, history: action.payload };
  }
}

export class AddCollection {
  action (data) {
    const collection = {
      [data.collection]: {
        [data.id]: data
      }
    };

    return { type: 'QueryCollectionAllReducer', payload: collection };
  }
}

export class QueryCollectionsToInitialState {
  action () {
    return {
      type: 'QueryCollectionsToInitialState',
      payload: {}
    };
  }

  reducer (state, action) {
    return {
      ...state,
      queryCollectionAll: initialState.queryCollectionAll
    };
  }
}

export class CreateCollections {
  action (collections) {
    const payload = collections.reduce((previous, item) => {
      const itemCollection = previous[item.collection] || {};

      return {
        ...previous,
        [item.collection]: {
          ...itemCollection,
          [item.id]: {
            ...item,
            results: item.results
              ? JSON.parse(JSON.parse(JSON.parse(item.results)))
              : reduxQuery.initialState.results
          }
        }
      };
    }, {});

    return { type: 'QueryCollectionAllReducer', payload };
  }
}
