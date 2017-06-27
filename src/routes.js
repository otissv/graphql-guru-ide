// Core
import LayoutView from './core/app/views/layout-view-app';
import query from './modules/query/route-query';
import schema from './modules/schema/route-schema';
import persisted from './modules/persisted/route-persisted';

const routes = store => {
  return {
    path: '/',
    component: LayoutView,
    indexRoute: query,
    childRoutes: [...schema, ...persisted]
  };
};

export default routes;
