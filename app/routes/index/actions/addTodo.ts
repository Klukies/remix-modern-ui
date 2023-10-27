import { parse } from '@conform-to/zod';
import { json, redirect } from '@remix-run/node';
import { z } from 'zod';

import { _action } from './schemas';

import { db } from '#services/drizzle';
import { todos } from '#services/drizzle/schema';

export const addTodoSchema = z.object({
  _action: z.literal(_action.enum.add),
  title: z.string({ required_error: 'Give up a title' }),
});

export const addTodo = async (formData: FormData) => {
  const submission = parse(formData, { schema: addTodoSchema });

  if (!submission.value || submission.intent !== 'submit') {
    return json({ _action: _action.enum.add, submission });
  }

  await db.insert(todos).values({ title: submission.value.title });

  return redirect('/');
};
