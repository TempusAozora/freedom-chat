import { Pool } from 'pg';
import 'dotenv/config';
import { readFile } from 'node:fs/promises';
import path from 'path';

const dbPool = new Pool({
    database: 'public-chat-test',
    user: 'chat-user',
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD
});

export async function sql_query(filename, params) {
    const _qry = await readFile(path.join('sql', `${filename}.sql`));
    const qry = _qry.toString()

    let result;
    if (!!params) result = await dbPool.query(qry, params);
    else result = await dbPool.query(qry);

    return result.rows;
}

