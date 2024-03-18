import type { InferSelectModel } from 'drizzle-orm'
import { account, session} from './schema.js'

export type Comment = InferSelectModel<typeof account>
export type Session = InferSelectModel<typeof session>
