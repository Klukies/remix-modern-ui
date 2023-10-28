import { z } from 'zod';

import { toastSchema } from '#utils/toast';

export const _action = z.enum(['add', 'toggle', 'delete', 'toggleAll']);

export const todoToastSchema = toastSchema.extend({ _action });
