import { type Submission, useForm as useConformForm } from '@conform-to/react';
import { useActionData, useNavigation } from '@remix-run/react';
import { useEffect, useState } from 'react';

export const useForm: typeof useConformForm = (...args) => {
  const navigation = useNavigation();
  const actionData = useActionData<{ submission?: Submission }>();
  const [hasSubmitted, setHasSubmitted] = useState(navigation.state === 'submitting');

  const [form, fields] = useConformForm(...args);

  useEffect(() => {
    if (!hasSubmitted && navigation.state === 'submitting') {
      setHasSubmitted(true);
    }
  }, [hasSubmitted, navigation.state]);

  useEffect(() => {
    if (navigation.state === 'idle' && !actionData && hasSubmitted) {
      form.ref.current?.reset();
    }
  }, [navigation.state, actionData, form.ref, hasSubmitted]);

  return [form, fields];
};
