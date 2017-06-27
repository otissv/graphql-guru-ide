export const REQUEST_SETTINGS = '/request-settings';

export default [
  {
    getComponent (nextState, cb) {
      require.ensure([], require => {
        cb(null, require('./views/view-query').default);
      });
    }
  }
];
