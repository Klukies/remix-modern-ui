import { z } from 'zod';

export const _action = z.enum(['add', 'toggle', 'delete', 'toggleAll']);
