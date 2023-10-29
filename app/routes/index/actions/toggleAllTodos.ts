import { parse } from '@conform-to/zod';
import { json } from '@remix-run/node';
import { z } from 'zod';

import { _action } from './schemas';

import { db } from '#services/drizzle';
import { todos } from '#services/drizzle/schema';

export const toggleTodoSchema = z.object({
  _action: z.literal(_action.enum.toggleAll),
  areAllTodosCompleted: z.number(),
});

export const toggleAllTodos = async (formData: FormData) => {
  const submission = parse(formData, { schema: toggleTodoSchema });

  if (!submission.value || submission.intent !== 'submit') {
    return json({ _action: _action.enum.toggleAll, submission });
  }

  await db.update(todos).set({ isCompleted: !submission.value.areAllTodosCompleted });

  return new Response(null, { status: 204 });
};
