import sqlite from 'sqlite3'

const dbdir = './db/website.db'

const db = new sqlite.Database(dbdir, sqlite.OPEN_READWRITE, (err) => {
    if(err) {
        throw err
    }
    else{
        console.log("db running...")
    }
})

export default db