import type { InferSelectModel } from 'drizzle-orm';
import { content, creator } from './schema.ts';

export type Content = InferSelectModel<typeof content>;
export type Creator = InferSelectModel<typeof creator>;