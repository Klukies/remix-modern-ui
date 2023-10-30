import { type ServerRuntimeMetaArgs } from '@remix-run/server-runtime';

type ServerRuntimeMetaMatch = ServerRuntimeMetaArgs['matches'][number]['meta'][number];

const hasTitle = (meta: ServerRuntimeMetaMatch): meta is { title: string } => {
  return 'title' in meta;
};

export const getNestedTitle = (title: string, matches: ServerRuntimeMetaArgs['matches']) => {
  return matches.reduce((nestedTitle, { meta }) => {
    const title = meta.find(hasTitle)?.title;

    return title ? `${nestedTitle} | ${title}` : nestedTitle;
  }, title);
};
