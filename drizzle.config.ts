import { type Config } from 'drizzle-kit';

export default {
  driver: 'better-sqlite',
  dbCredentials: { url: './app/services/drizzle/db.sqlite' },
  schema: './app/services/drizzle/schema',
  out: './app/services/drizzle/migrations',
} satisfies Config;
