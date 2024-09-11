import { z } from 'zod';

import { toastSchema } from '#utils/toast';

export const intent = z.enum(['add', 'toggle', 'delete', 'toggleAll']);

export const addTodoSchema = z.object({
  intent: z.literal(intent.enum.add),
  title: z.string({ required_error: 'Give up a title' }),
});

export const deleteTodoSchema = z.object({
  intent: z.literal(intent.enum.delete),
  id: z.number(),
});

export const toggleAllTodosSchema = z.object({
  intent: z.literal(intent.enum.toggleAll),
  areAllTodosCompleted: z.number(),
});

export const toggleTodoSchema = z.object({
  intent: z.literal(intent.enum.toggle),
  id: z.number(),
  isCompleted: z.number(),
});

export const todoToastSchema = toastSchema.extend({ intent });
