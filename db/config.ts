import { defineDb } from "astro:db";
import { defineTable, column, NOW } from 'astro:db';


const Account = defineTable({
    columns: {
        id: column.text({ primaryKey: true }),
        username: column.text(),
        password: column.text(),
    },
    indexes: [
        { on: ["id", "username"], unique: true },
    ]
})

const Session = defineTable({
    columns: {
        id: column.text({ primaryKey: true }),
        usernameId: column.text(),
        sessionId: column.text(),
        expiredDate: column.date(),
    },
    indexes: [
        { on: ["id", "usernameId"], unique: true },
    ]
})

export default defineDb({
    tables: {Account, Session}
})