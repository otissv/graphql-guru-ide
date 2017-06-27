import { SCHEMA_ROUTE } from '../../constants/routes-constants';
import axios from 'axios';

export const register = 'schema';

export const initialState = {
  schema: {
    ast: {},
    print: '',
    type: []
  }
};

export class GetSchema {
  action () {
    const request = axios.get(SCHEMA_ROUTE);

    return {
      type: 'GetSchema',
      payload: request.then(response => response)
    };
  }
}

export class SetSchema {
  action (schema) {
    return { type: 'SetSchema', payload: schema };
  }

  reducer (state, action) {
    return { ...state, schema: action.payload };
  }
}
