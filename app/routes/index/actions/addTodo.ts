import { parse } from '@conform-to/zod';
import { json } from '@remix-run/node';
import { z } from 'zod';

import { _action } from './schemas';

import { db } from '#services/drizzle';
import { todos } from '#services/drizzle/schema';
import { toastVariant } from '#utils/toast';
import { redirectWithToast } from '#utils/toast.server';

export const addTodoSchema = z.object({
  _action: z.literal(_action.enum.add),
  title: z.string({ required_error: 'Give up a title' }),
});

export const addTodo = async (formData: FormData) => {
  const submission = parse(formData, { schema: addTodoSchema });

  if (!submission.value || submission.intent !== 'submit') {
    return json({ _action: _action.enum.add, submission });
  }

  try {
    // TODO: uncomment the error to see the error toast
    // throw new Error();
    await db.insert(todos).values({ title: submission.value.title });
  } catch (error) {
    return redirectWithToast('/', { variant: toastVariant.enum.error, _action: _action.enum.add });
  }

  return redirectWithToast('/', { variant: 'success', _action: _action.enum.add });
};
