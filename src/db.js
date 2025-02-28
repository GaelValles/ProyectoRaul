import pg from 'pg'

export const pool = new pg.Pool({
    user: "postgres",
    host: "localhost",
    password: "murcielago576",
    database: "utd",
    port: "5432"
})

export default pool;