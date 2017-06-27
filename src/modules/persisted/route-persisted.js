export const PERSISATENT_ROUTE = '/persisted';

export default [
  {
    path: PERSISATENT_ROUTE,
    getComponent (nextState, cb) {
      require.ensure([], require => {
        cb(null, require('./views/view-persisted').default);
      });
    }
  }
];
