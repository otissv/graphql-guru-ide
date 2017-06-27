import { IDE_ROUTE } from '../../../constants/routes-constants';
import { query } from '../../../helpers/async-query';

export const register = 'collection';
import * as reduxQuery from './redux-query';

export const initialState = {
  queryCollectionAll: {}
};

export class GetQueries {
  action () {
    const request = query({
      url: IDE_ROUTE,
      actions: ['ideQueryFindAll'],
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
      }`
    });

    return { type: 'GetQueries', payload: request };
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

    return { type: 'AddCollection', payload: collection };
  }

  reducer (state, action) {
    return {
      ...state,
      queryCollectionAll: { ...state.queryCollectionAll, ...action.payload }
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
            id: item.id,
            collection: item.collection,
            created: item.created,
            name: item.name,
            precache: item.precache,
            query: item.query,
            variables: item.variables,
            results: item.results
              ? JSON.parse(JSON.parse(JSON.parse(item.results)))
              : reduxQuery.initialState.results
          }
        }
      };
    }, {});

    return { type: 'CreateCollections', payload };
  }

  reducer (state, action) {
    return { ...state, queryCollectionAll: action.payload };
  }
}
