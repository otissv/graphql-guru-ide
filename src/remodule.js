import remodule from '../../remodule/dist/remodule';
import * as app from './core/app/redux-app';
import * as collection from './modules/query/redux/redux-collection';
import * as graphiql from './modules/query/redux/redux-graphiql';
import * as graphql from './modules/graphql/redux/redux-graphql';
import * as persisted from './modules/persisted/redux-persisted';
import * as query from './modules/query/redux/redux-query';
import * as queryHistory from './modules/query/redux/redux-history';
import * as schema from './modules/schema/redux-schema';
import * as forms from './modules/forms/redux/redux-forms';
import * as settings from './modules/settings/redux/redux-settings';

export default remodule([
  app,
  forms,
  collection,
  query,
  persisted,
  graphql,
  graphiql,
  queryHistory,
  schema,
  settings
]);
