import { flatRoutes } from 'remix-flat-routes';

/** @type {import('@remix-run/dev').AppConfig} */
export default {
  ignoredRouteFiles: ['**/.*'],
  watchPaths: ['./tailwind.config.ts'],
  routes(defineRoutes) {
    return flatRoutes('routes', defineRoutes, {
      ignoredRouteFiles: ['**/actions/**/*', '**/components/**/*'],
    });
  },
};
