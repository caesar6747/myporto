import pg from 'pg';

// Make sure we DO NOT "prerender" this function to allow the ENV variables to update on the fly
export const prerender = false;

const client = new pg.Client({
    host: "caesarnuari.online",
    port: 5432,
    database: "postgres",
    user: "postgres",
    password: "2234",
});

await client.connect()

export { client as db };
