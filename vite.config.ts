import { vitePlugin as remix } from '@remix-run/dev';
import browserslist from 'browserslist';
import { browserslistToTargets } from 'lightningcss';
import { flatRoutes } from 'remix-flat-routes';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    cssMinify: 'lightningcss',
    target: 'es2022',
  },
  css: {
    transformer: 'lightningcss',
    lightningcss: {
      targets: browserslistToTargets(browserslist('last 2 versions')),
    },
  },
  plugins: [
    remix({
      ignoredRouteFiles: ['**/.*'],
      routes(defineRoutes) {
        const routes = flatRoutes('routes', defineRoutes);

        return routes;
      },
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
      },
    }),
  ],
});
