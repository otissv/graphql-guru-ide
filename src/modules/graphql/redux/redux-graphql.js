import { introspectionQuery } from 'graphql/utilities/introspectionQuery';
import { query } from '../../../helpers/async-query.js';

export const register = 'graphql';

export const initialState = {
  introspection: {},
  isConnected: false
};

export class GetGraphqlSchema {
  action (endpoint) {
    const request = query({
      url: endpoint,
      actions: ['__schema'],
      query: introspectionQuery
    });

    return {
      type: 'GetGraphqlSchema',
      payload: request.then(response => response)
    };
  }
}

export class SetGraphqlSchema {
  action (schema) {
    return {
      type: 'SetGraphqlSchema',
      payload: schema
    };
  }

  reducer (state, action) {
    return { ...state, introspection: action.payload };
  }
}

export class SetSchemaIsConnected {
  action (boolean) {
    return {
      type: 'SetSchemaIsConnected',
      payload: boolean
    };
  }

  reducer (state, action) {
    return { ...state, isConnected: action.payload };
  }
}
