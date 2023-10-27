import { sql } from 'drizzle-orm';
import { integer, text, sqliteTable } from 'drizzle-orm/sqlite-core';

export const todos = sqliteTable('todos', {
  id: integer('id').primaryKey(),
  title: text('title').notNull(),
  isCompleted: integer('isCompleted', { mode: 'boolean' }).notNull().default(false),
  createdAt: text('createdAt').default(sql`(strftime('%Y-%m-%d %H:%M:%f', 'now'))`),
});

export type Todo = typeof todos.$inferSelect;
