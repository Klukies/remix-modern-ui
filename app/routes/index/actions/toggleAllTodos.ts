import { parse } from '@conform-to/zod';
import { json } from '@remix-run/node';

import { toggleAllTodosSchema } from './schemas';

import { db } from '#services/drizzle';
import { todos } from '#services/drizzle/schema';

export const toggleAllTodos = async (formData: FormData) => {
  const submission = parse(formData, { schema: toggleAllTodosSchema });

  if (!submission.value || submission.intent !== 'submit') {
    return json(submission);
  }

  await db.update(todos).set({ isCompleted: !submission.value.areAllTodosCompleted });

  return new Response(null, { status: 204 });
};
