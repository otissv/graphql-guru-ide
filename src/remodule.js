import camel from 'to-camel-case';
import { compose, createStore } from 'redux';
import register from './remodule-register';
import * as redux from 'react-redux';

function reduxMethods (register, method) {
  return function (fn) {
    return Object.keys(register).reduce((previousObj, currentKey) => {
      let Class = currentKey !== 'initialState' && currentKey !== 'register'
        ? (Class = new register[currentKey]())
        : {};

      if (Class[method] == null) return previousObj;

      return fn({ previousObj, currentKey, method, Class });
    }, {});
  };
}

export const initialState = register.reduce((previousObj, currentModule) => {
  return {
    ...previousObj,
    [currentModule.register]: currentModule.initialState
  };
}, {});

export const actions = register.reduce((previous, current) => {
  return {
    ...previous,
    ...reduxMethods(current, 'action')(({
      previousObj,
      currentKey,
      method,
      Class
    }) => {
      return {
        ...previousObj,
        [camel(currentKey)]: Class[method]
      };
    })
  };
}, {});

export const reducers = (state = initialState, action) => {
  return register.reduce((previous, currentModule) => {
    const moduleName = currentModule.register;

    const reducer = (state, action) => {
      const actions = reduxMethods(currentModule, 'reducer')(({
        previousObj,
        currentKey,
        method,
        Class
      }) => {
        return {
          ...previousObj,
          [currentKey]: Class[method](state, action)
        };
      });
      return actions[action.type] || state;
    };
    return {
      ...previous,
      [moduleName]: reducer(state[moduleName], action)
    };
  }, {});
};

export const store = middleware =>
  compose(...middleware)(createStore)(reducers);

export function mapStateToProps (state) {
  return register.reduce((previousObj, currentModule) => {
    const moduleName = currentModule.register;

    return {
      ...previousObj,
      initialState,
      ...Object.keys(
        currentModule.initialState
      ).reduce((previous, currentKey) => {
        return {
          ...previous,
          [currentKey]: state[moduleName][currentKey]
        };
      }, {})
    };
  }, {});
}

export const connect = Component =>
  redux.connect(mapStateToProps, actions)(Component);
