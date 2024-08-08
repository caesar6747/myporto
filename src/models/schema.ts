import { password } from 'bun';
import { text, sqliteTable, integer } from 'drizzle-orm/sqlite-core';

export const creator = sqliteTable('creator', {
    id: text('id').primaryKey(),
    name: text('name').notNull(),
    image: text('creator_img'),
    link: text('creator_link')
})

export const content = sqliteTable('content_root', {
    id: text('id').primaryKey(),
    tittle: text('tittle').notNull(),
    previewImg: text('preview_image'),
    previewDesc: text('preview_description'),
    creatorId: text('creator_id').notNull().references(() => creator.id),
    posted: text('posted').notNull(),
    updated: text('updated'),
    view: integer('view').notNull(),
    like: integer('like').notNull(),
    contentLink: text('content_link'),
})

export const content_component = sqliteTable('content_component', {
    id: text('id').primaryKey(),
    index: text('index').notNull(),
    content: text('content'),
    tag: integer('tag'),
    contentId: text('content_id'),
    style: text('style'),
})

export const Account = sqliteTable('account', {
    id: text('id').primaryKey(),
    username: text('username').notNull(),
    password: text('password').notNull(),
})

export const Session = sqliteTable('session', {
    id: text('id').primaryKey(),
    usernameId: text('usernameId').notNull(),
    sessionId: text('sessionId').notNull(),
    expired: text('expired').notNull(),
})

