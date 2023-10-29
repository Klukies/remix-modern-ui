import { parse } from '@conform-to/zod';
import { json } from '@remix-run/node';
import { eq } from 'drizzle-orm';
import { z } from 'zod';

import { _action } from './schemas';

import { db } from '#services/drizzle';
import { todos } from '#services/drizzle/schema';
// import { sleep } from '#utils/misc';

export const deleteTodoSchema = z.object({
  _action: z.literal(_action.enum.delete),
  id: z.number(),
});

export const deleteTodo = async (formData: FormData) => {
  const submission = parse(formData, { schema: deleteTodoSchema });

  if (!submission.value || submission.intent !== 'submit') {
    return json({ _action: _action.enum.delete, submission });
  }

  // TODO: uncomment the sleep function to see the pending state
  // await sleep(3000);
  await db.delete(todos).where(eq(todos.id, submission.value.id));

  return new Response(null, { status: 204 });
};
