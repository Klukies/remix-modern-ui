import { parseWithZod } from '@conform-to/zod';
import { eq } from 'drizzle-orm';

import { intent, toggleTodoSchema } from './schemas';

import { db } from '#services/drizzle';
import { todos } from '#services/drizzle/schema';
import { sleep } from '#utils/misc';
import { toastVariant } from '#utils/toast';
import { jsonWithToast } from '#utils/toast.server';

export const toggleTodo = async (formData: FormData) => {
  const submission = parseWithZod(formData, { schema: toggleTodoSchema });

  if (submission.status !== 'success') {
    return submission.reply();
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
      toast: { variant: toastVariant.enum.error, intent: intent.enum.toggle },
    });
  }
};
