import { useLoaderData } from '@remix-run/react';
import { type z } from 'zod';

import { type intent } from '../actions/schemas';
import { type loader } from '../route';

import { Toast } from '#components/Toast';

type MessageProps = { action: z.infer<typeof intent> };

const Message = ({ action: intent }: MessageProps) => {
  switch (intent) {
    case 'add':
      return 'Something went wrong while adding the todo';
    case 'delete':
      return 'Something went wrong while deleting the todo';
    case 'toggle':
      return 'Something went wrong while updating the todo';
    case 'toggleAll':
      return 'Something went wrong while updating the todos';
  }
};

export const TodoToast = () => {
  const { toast } = useLoaderData<typeof loader>();

  if (toast?.variant !== 'error') {
    return null;
  }

  return (
    <Toast variant={toast.variant}>
      <Message action={toast.intent} />
    </Toast>
  );
};
