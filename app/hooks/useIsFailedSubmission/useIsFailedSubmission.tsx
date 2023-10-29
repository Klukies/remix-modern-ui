import { type Fetcher } from '@remix-run/react';

export const useIsFailedSubmission = <TFetcher extends Fetcher>(fetcher: TFetcher) => {
  if (fetcher.state !== 'idle') {
    return false;
  }

  return !!fetcher.data && 'error' in fetcher.data;
};
