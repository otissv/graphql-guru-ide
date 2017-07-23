import { IDE_ROUTE } from '../../../constants/routes-constants';
import { query } from '../../../helpers/async-query';

export const register = 'persistedCollection';
import * as reduxPersisted from './redux-persisted';

export const initialState = {
  persistedCollectionAll: {}
};

export class PersistedCollectionAllReducer {
  reducer (state, action) {
    return {
      ...state,
      persistedCollectionAll: {
        ...state.persistedCollectionAll,
        ...action.payload
      }
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

    return { type: 'PersistedCollectionAllReducer', payload: collection };
  }
}

export class PersistedCollectionsToInitialState {
  action () {
    return {
      type: 'PersistedCollectionsToInitialState',
      payload: {}
    };
  }

  reducer (state, action) {
    return {
      ...state,
      persistedCollectionAll: initialState.persistedCollectionAll
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
            persisted: item.persisted,
            variables: item.variables,
            results: item.results
              ? JSON.parse(JSON.parse(JSON.parse(item.results)))
              : reduxPersisted.initialState.results
          }
        }
      };
    }, {});

    return { type: 'PersistedCollectionAllReducer', payload };
  }
}
