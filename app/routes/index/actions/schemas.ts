import { z } from 'zod';

import { toastSchema } from '#utils/toast';

export const _action = z.enum(['add', 'toggle', 'delete', 'toggleAll']);

export const addTodoSchema = z.object({
  _action: z.literal(_action.enum.add),
  title: z.string({ required_error: 'Give up a title' }),
});

export const deleteTodoSchema = z.object({
  _action: z.literal(_action.enum.delete),
  id: z.number(),
});

export const toggleAllTodosSchema = z.object({
  _action: z.literal(_action.enum.toggleAll),
  areAllTodosCompleted: z.number(),
});

export const toggleTodoSchema = z.object({
  _action: z.literal(_action.enum.toggle),
  id: z.number(),
  isCompleted: z.number(),
});

export const todoToastSchema = toastSchema.extend({ _action });
