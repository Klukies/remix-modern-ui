import { createCookieSessionStorage, redirect } from '@remix-run/node';
import { type z } from 'zod';

import { type Toast, toastSchema } from './toast';

import { combineHeaders } from '#utils/headers';

const toastKey = 'toast';

export const toastSessionStorage = createCookieSessionStorage({
  cookie: {
    name: 'toast',
    sameSite: 'lax',
    path: '/',
    httpOnly: true,
    secrets: [process.env.SESSION_SECRET],
    secure: process.env.NODE_ENV === 'production',
  },
});

export const createToastHeaders = async (toast: Toast) => {
  const session = await toastSessionStorage.getSession();
  const parsedToast = toastSchema.parse(toast);
  session.flash(toastKey, parsedToast);
  const cookie = await toastSessionStorage.commitSession(session);

  return new Headers({ 'set-cookie': cookie });
};

export const redirectWithToast = async (url: string, toast: Toast, init?: ResponseInit) => {
  return redirect(url, {
    ...init,
    headers: combineHeaders(init?.headers, await createToastHeaders(toast)),
  });
};

export const getToast = async <Schema extends z.infer<typeof toastSchema>>(
  request: Request,
  schema: z.Schema<Schema>,
) => {
  const session = await toastSessionStorage.getSession(request.headers.get('cookie'));
  const result = schema.safeParse(session.get(toastKey));
  const toast = result.success ? result.data : null;

  return {
    toast,
    headers: toast
      ? new Headers({ 'set-cookie': await toastSessionStorage.destroySession(session) })
      : null,
  };
};
