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

export class AddQueryCollection {
  action (data) {
    const collection = {
      [data.collection]: {
        [data.id]: data
      }
    };

    return { type: 'QueryCollectionAllReducer', payload: collection };
  }
}

export class QueryCollectionAllToInitialState {
  action () {
    return {
      type: 'QueryCollectionAllToInitialState',
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

export class CreateQueryCollections {
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
