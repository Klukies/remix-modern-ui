import { parseWithZod } from '@conform-to/zod';
import { eq } from 'drizzle-orm';

import { deleteTodoSchema } from './schemas';

import { db } from '#services/drizzle';
import { todos } from '#services/drizzle/schema';
import { sleep } from '#utils/misc';

export const deleteTodo = async (formData: FormData) => {
  const submission = parseWithZod(formData, { schema: deleteTodoSchema });

  if (submission.status !== 'success') {
    return submission.reply();
  }

  // TODO: uncomment the sleep function to see the pending state
  await sleep(3000);
  await db.delete(todos).where(eq(todos.id, submission.value.id));

  return new Response(null, { status: 204 });
};
