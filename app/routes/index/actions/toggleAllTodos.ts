import { parseWithZod } from '@conform-to/zod';

import { toggleAllTodosSchema } from './schemas';

import { db } from '#services/drizzle';
import { todos } from '#services/drizzle/schema';

export const toggleAllTodos = async (formData: FormData) => {
  const submission = parseWithZod(formData, { schema: toggleAllTodosSchema });

  if (submission.status !== 'success') {
    return submission.reply();
  }

  await db.update(todos).set({ isCompleted: !submission.value.areAllTodosCompleted });

  return new Response(null, { status: 204 });
};
