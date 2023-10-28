import { z } from 'zod';

const envSchema = z.object({
  SESSION_SECRET: z.string(),
});

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    // eslint-disable-next-line @typescript-eslint/consistent-type-definitions, @typescript-eslint/no-empty-interface
    interface ProcessEnv extends z.infer<typeof envSchema> {}
  }
}

export const init = () => {
  const parsed = envSchema.safeParse(process.env);

  if (parsed.success === false) {
    console.error('❌ Invalid environment variables:', parsed.error.flatten().fieldErrors);

    throw new Error('Invalid envirmonment variables');
  }
};
