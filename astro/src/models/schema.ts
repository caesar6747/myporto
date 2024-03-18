import { text, sqliteTable, integer } from 'drizzle-orm/sqlite-core';

export const account = sqliteTable('account', {
  id: integer('id').primaryKey(),
  username: text('usename').notNull(),
  password: text('password').notNull()
});

export const session = sqliteTable('session', {
  id: integer('id'),
  usernameId: integer('usernameId').notNull(),
  sessionId: text('sessionId').notNull(),
  expiredDate: text('expired').notNull()
})
