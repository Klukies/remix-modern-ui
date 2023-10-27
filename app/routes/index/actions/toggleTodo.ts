import { parse } from '@conform-to/zod';
import { json, redirect } from '@remix-run/node';
import { eq, sql } from 'drizzle-orm';
import { z } from 'zod';

import { _action } from './schemas';

import { db } from '#services/drizzle';
import { todos } from '#services/drizzle/schema';

export const toggleTodoSchema = z.object({
  _action: z.literal(_action.enum.toggle),
  id: z.number(),
});

export const toggleTodo = async (formData: FormData) => {
  const submission = parse(formData, { schema: toggleTodoSchema });

  if (!submission.value || submission.intent !== 'submit') {
    return json({ _action: _action.enum.toggle, submission });
  }

  await db
    .update(todos)
    .set({ isCompleted: sql`not isCompleted` })
    .where(eq(todos.id, submission.value.id));

  return redirect('/');
};
