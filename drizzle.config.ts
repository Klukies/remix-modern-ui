import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  dialect: 'sqlite',
  dbCredentials: {
    url: './app/services/drizzle/db.sqlite',
  },
  schema: './app/services/drizzle/schema',
  out: './app/services/drizzle/migrations',
});
