import { DatabaseSync } from 'node:sqlite';

export async function databaseConfig(): Promise<DatabaseSync> {
    const db = new DatabaseSync('./cursosDatabase.db', { timeout: 5000 });
    const createQuery: string = `
    CREATE TABLE IF NOT EXISTS cursos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        categoria TEXT NOT NULL,
        datetime TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    ) STRICT;`;
    if (!db) {
        throw new Error('Falha ao conectar ao banco de dados');
    }
    db.exec(createQuery);
    return db;
}
