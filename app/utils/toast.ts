import { z } from 'zod';

export const toastVariant = z.enum(['success', 'error']);

export const toastSchema = z.object({
  variant: toastVariant,
  intent: z.string(),
});
export type Toast = z.infer<typeof toastSchema>;
