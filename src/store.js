import { applyMiddleware } from 'redux';
import DevTools from './core/devtools/dev-tools-component';
import thunk from 'redux-thunk';
import PouchDB from 'pouchdb';
import { persistentStore } from 'redux-pouchdb';
import { store } from './remodule';

const db = new PouchDB(window.location.host);

export default store([
  applyMiddleware(thunk),
  persistentStore(db),
  window.devToolsExtension ? window.devToolsExtension() : DevTools.instrument()
]);
