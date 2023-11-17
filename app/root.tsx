import { type MetaFunction, type LinksFunction } from '@remix-run/node';
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react';

import './styles/reset.css';
import './styles/global.css';

import { Icon } from '#components/Icon';

export const links: LinksFunction = () => [...Icon.links()];

export const meta: MetaFunction = () => [{ title: 'Modern UI with Remix' }];

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <LiveReload />
        <Scripts />
      </body>
    </html>
  );
}
