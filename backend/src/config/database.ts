import { DatabaseSync } from 'node:sqlite';

export function databaseConfig(): DatabaseSync {
    const db: DatabaseSync = new DatabaseSync('./cursosDatabase.db');
    const createQuery: string = `
    CREATE TABLE IF NOT EXISTS cursos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        categoria TEXT NOT NULL,
        datetime TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    ) STRICT;`;

    db.exec(createQuery);
    return db;
}
