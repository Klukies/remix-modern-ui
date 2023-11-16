import { type Submission, useForm as useConformForm } from '@conform-to/react';
import { useActionData, useLoaderData, useNavigation } from '@remix-run/react';
import { useEffect, useState } from 'react';

import { toastVariant, type Toast } from '#utils/toast';

export const useForm: typeof useConformForm = (...args) => {
  // FIXME: ensure this works with through a native form navigation or with a fetcher
  const navigation = useNavigation();
  const toast = useLoaderData<{ toast?: Toast }>().toast;
  const actionData = useActionData<{ submission?: Submission }>();
  const [hasSubmitted, setHasSubmitted] = useState(navigation.state === 'submitting');

  const [form, fields] = useConformForm(...args);

  useEffect(() => {
    if (!hasSubmitted && navigation.state === 'submitting') {
      setHasSubmitted(true);
    }
  }, [hasSubmitted, navigation.state]);

  useEffect(() => {
    if (
      navigation.state === 'idle' &&
      !actionData &&
      hasSubmitted &&
      toast?.variant !== toastVariant.enum.error
    ) {
      form.ref.current?.reset();
    }
  }, [navigation.state, actionData, form.ref, hasSubmitted, toast?.variant]);

  return [form, fields];
};
