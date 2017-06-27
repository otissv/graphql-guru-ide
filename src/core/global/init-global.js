import PouchDB from 'pouchdb';

export default function init ({ app, store }) {
  app.db = PouchDB;

  (function localHost () {
    if (window.location.hostname === 'localhost') {
      // add store
      app.store = store;
      app.location = window.location.pathname;
      app.routes = [];
    }
  })();

  /* eslint-disable no-undef */

  app.db = new PouchDB(app.domain || window.location.host);
  /* eslint-enable no-undef */
}
