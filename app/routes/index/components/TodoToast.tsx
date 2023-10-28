import { useLoaderData } from '@remix-run/react';
import { type z } from 'zod';

import { type _action } from '../actions/schemas';
import { type loader } from '../route';

import { Toast } from '#components/Toast';

type MessageProps = { action: z.infer<typeof _action> };

const Message = ({ action: _action }: MessageProps) => {
  switch (_action) {
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
      <Message action={toast._action} />
    </Toast>
  );
};
