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

    if (
      history.persistedHistory ||
      history.queryCollection ||
      history.queryHistory
    ) {
      const ideQueryHistoryClear = history.queryHistory
        ? 'ideQueryHistoryClear { id }'
        : '';
      const ideQueryCollectionClear = history.queryCollection
        ? 'ideQueryCollectionClear { id }'
        : '';
      const idePersistedQueryClear = history.persistedHistory ? '' : '';

      const actions = [
        ideQueryHistoryClear,
        ideQueryCollectionClear,
        idePersistedQueryClear
      ].reduce((previous, action) => {
        return action !== '' ? [...previous, action] : previous;
      }, []);

      const query = `mutation {
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
