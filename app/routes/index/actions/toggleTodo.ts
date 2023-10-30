import { parse } from '@conform-to/zod';
import { json } from '@remix-run/node';
import { eq } from 'drizzle-orm';
import { z } from 'zod';

import { _action } from './schemas';

import { db } from '#services/drizzle';
import { todos } from '#services/drizzle/schema';
import { sleep } from '#utils/misc';
import { toastVariant } from '#utils/toast';
import { jsonWithToast } from '#utils/toast.server';

export const toggleTodoSchema = z.object({
  _action: z.literal(_action.enum.toggle),
  id: z.number(),
  isCompleted: z.number(),
});

export const toggleTodo = async (formData: FormData) => {
  const submission = parse(formData, { schema: toggleTodoSchema });

  if (!submission.value || submission.intent !== 'submit') {
    return json({ _action: _action.enum.toggle, submission });
  }

  try {
    // TODO: uncomment the sleep function to see optmistic ui in action
    await sleep(3000);
    // TODO: uncomment the error to see how we handle errors with optmistic ui
    // throw new Error();
    await db
      .update(todos)
      .set({ isCompleted: !!submission.value.isCompleted })
      .where(eq(todos.id, submission.value.id));

    return new Response(null, { status: 204 });
  } catch (error) {
    return jsonWithToast({
      data: { error: true },
      init: { status: 500 },
      toast: { variant: toastVariant.enum.error, _action: _action.enum.toggle },
    });
  }
};
