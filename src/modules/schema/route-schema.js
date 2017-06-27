export const SCHEMA_AST_ROUTE = '/schema/ast';
export const SCHEMA_DEFINITION_ROUTE = '/schema/definition';

export default [
  {
    path: SCHEMA_AST_ROUTE,
    getComponent (nextState, cb) {
      require.ensure([], require => {
        cb(null, require('./views/view-ast-schema').default);
      });
    }
  },
  {
    path: SCHEMA_DEFINITION_ROUTE,
    getComponent (nextState, cb) {
      require.ensure([], require => {
        cb(null, require('./views/view-definition-schema').default);
      });
    }
  }
];
