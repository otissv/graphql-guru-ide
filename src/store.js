import { applyMiddleware } from 'redux';
import DevTools from './core/devtools/dev-tools-component';
import thunk from 'redux-thunk';
import PouchDB from 'pouchdb';
import { persistentStore } from 'redux-pouchdb';
import remodule from './remodule';
import * as redux from 'react-redux';

const { actions, mapStateToProps, store } = remodule;

const db = new PouchDB(window.location.host);

export default store({
  middleware: [
    applyMiddleware(thunk),
    persistentStore(db),
    window.devToolsExtension
      ? window.devToolsExtension()
      : DevTools.instrument()
  ]
});

export const connect = Component =>
  redux.connect(mapStateToProps, actions)(Component);
