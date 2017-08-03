import { query as gqlFetch } from '../../../helpers/async-query';
import { IDE_ROUTE } from '../../../constants/routes-constants';

export const register = 'settings';

export const initialState = {
  uiSettings: {
    isSettingsModalOpen: false
  }
};

export class ClearSettingsHistory {
  action (history = {}) {
    let request = Promise.resolve();
console.log(history)
    if (
      history.persistedCollection ||
      history.persistedHistory ||
      history.queryCollection ||
      history.queryHistory
    ) {
      const idePersistedCollectionClear = history.persistedCollection 
        ? 'idePersistedCollectionClear { id }' 
        : '';
      const idePersistedHistoryClear = history.persistedHistory 
        ? 'idePersistedHistoryClear { id }' 
        : '';
      const ideQueryHistoryClear = history.queryHistory
        ? 'ideQueryHistoryClear { id }'
        : '';
      const ideQueryCollectionClear = history.queryCollection
        ? 'ideQueryCollectionClear { id }'
        : '';

      const actions = [
        idePersistedCollectionClear,
        idePersistedHistoryClear,
        ideQueryCollectionClear,
        ideQueryHistoryClear
      ].reduce((previous, action) => {
        return action !== '' ? [...previous, action] : previous;
      }, []);

      const query = `mutation {
        ${idePersistedCollectionClear}
        ${idePersistedHistoryClear}
        ${ideQueryHistoryClear}
        ${ideQueryCollectionClear}
      }`;

      request = gqlFetch({
        url: IDE_ROUTE,
        actions,
        query
      });
    }

    return { type: 'DoNothing', payload: request };
  }
}

export class SetSettingsModal {
  action (bool) {
    return { type: 'SetSettingsModal', payload: bool };
  }

  reducer (state, action) {
    return {
      ...state,
      uiSettings: { ...state.uiSettings, isSettingsModalOpen: action.payload }
    };
  }
}
