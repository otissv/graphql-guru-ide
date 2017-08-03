import * as reduxPersisted from './redux-persisted';

export const register = 'persistedCollection';

export const initialState = {
  persistedCollectionAll: {}
};

export class PersistedCollectionAllReducer {
  reducer (state, action) {
    return {
      ...state,
      persistedCollectionAll: { ...state.persistedCollectionAll, ...action.payload }
    };
  }
}

export class AddPersistedCollection {
  action (data) {
    const collection = {
      [data.collection]: {
        [data.id]: data
      }
    };

    return { type: 'PersistedCollectionAllReducer', payload: collection };
  }
}

export class PersistedCollectionAllToInitialState {
  action () {
    return {
      type: 'PersistedCollectionAllToInitialState',
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

export class CreatePersistedCollections {
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
              : reduxPersisted.initialState.results
          }
        }
      };
    }, {});

    return { type: 'PersistedCollectionAllReducer', payload };
  }
}
