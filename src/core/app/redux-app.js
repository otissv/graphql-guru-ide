import React from 'react';
import { browserHistory } from 'react-router';

export const register = 'app';

export const initialState = {
  appIsLoading: false,
  appRoutes: [],
  appSchemaStatus: {
    found: '',
    notFound: (
      <span>
        <i class="Settings-icon icon-attention"></i> Schema not Found
      </span>
    )
  }
};

export class RedirectTo {
  action (path) {
    browserHistory.push(path);

    return {
      type: 'LOCATION',
      payload: path
    };
  }
}

export class Loading {
  action (bool) {
    return {
      type: 'LOADING',
      payload: bool
    };
  }

  reducer (state, action) {
    return { ...state, appIsLoading: action.payload };
  }
}

export class SetLocation {
  action (lastLocation) {
    return {
      type: 'LOCATION',
      payload: lastLocation
    };
  }
}

export class SetRoutes {
  action (routes) {
    return {
      type: 'ROUTES',
      payload: routes
    };
  }

  reducer (state, action) {
    return { ...state, appRoutes: action.payload };
  }
}
