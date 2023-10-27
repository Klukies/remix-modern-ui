import { type LinksFunction } from '@remix-run/node';

const links: LinksFunction = () => [
  { rel: 'preload', href: '/images/remix.png', as: 'image', type: 'image/png' },
];

export const Logo = () => {
  return (
    <div className="mb-6 flex justify-center">
      <img src="/images/remix.png" alt="Remix" width={192} height={192} />
    </div>
  );
};

Logo.links = links;
