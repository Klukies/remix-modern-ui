import { parse } from '@conform-to/zod';
import { json } from '@remix-run/node';
import { eq } from 'drizzle-orm';

import { deleteTodoSchema } from './schemas';

import { db } from '#services/drizzle';
import { todos } from '#services/drizzle/schema';
// import { sleep } from '#utils/misc';

export const deleteTodo = async (formData: FormData) => {
  const submission = parse(formData, { schema: deleteTodoSchema });

  if (!submission.value || submission.intent !== 'submit') {
    return json(submission);
  }

  // TODO: uncomment the sleep function to see the pending state
  // await sleep(3000);
  await db.delete(todos).where(eq(todos.id, submission.value.id));

  return new Response(null, { status: 204 });
};
