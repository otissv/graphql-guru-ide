import remodule from 'remodule';
import * as app from './core/app/redux-app';
import * as forms from './modules/forms/redux/redux-forms';
import * as graphql from './modules/graphql/redux/redux-graphql';
import * as persisted from './modules/persisted/redux/redux-persisted';
import * as persistedCollection from './modules/persisted/redux/redux-collection-persisted';
import * as persistedHistory from './modules/persisted/redux/redux-history-persisted';
import * as query from './modules/query/redux/redux-query';
import * as queryCollection from './modules/query/redux/redux-collection-query';
import * as queryHistory from './modules/query/redux/redux-history-query';
import * as schema from './modules/schema/redux-schema';
import * as settings from './modules/settings/redux/redux-settings';

export default remodule([
  app,
  forms,
  graphql,
  persisted,
  persistedCollection,
  persistedHistory,
  query,
  queryCollection,
  queryHistory,
  schema,
  settings
]);
