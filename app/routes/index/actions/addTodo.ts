import { parseWithZod } from '@conform-to/zod';
import { json } from '@remix-run/node';

import { intent, addTodoSchema } from './schemas';

import { db } from '#services/drizzle';
import { todos } from '#services/drizzle/schema';
import { toastVariant } from '#utils/toast';
import { jsonWithToast } from '#utils/toast.server';

export const addTodo = async (formData: FormData) => {
  const submission = parseWithZod(formData, { schema: addTodoSchema });

  if (submission.status !== 'success') {
    return submission.reply();
  }

  try {
    // TODO: uncomment the error to see the error toast
    // throw new Error();
    await db.insert(todos).values({ title: submission.value.title });
    return json({ ...submission, payload: null }, { status: 201 });
  } catch (error) {
    return jsonWithToast({
      data: submission,
      init: { status: 500 },
      toast: { variant: toastVariant.enum.error, intent: intent.enum.add },
    });
  }
};
