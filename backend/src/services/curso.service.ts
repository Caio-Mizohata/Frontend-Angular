import { DatabaseSync } from 'node:sqlite';
import { databaseConfig } from '../config/database';
import type { ICurso } from '../interfaces/curso.interface';
import { CursoSchema } from '../schemas/curso.schema';

class CursoService {
    private db: Promise<DatabaseSync>;

    constructor() {
        this.db = databaseConfig();
    }

    public async getAllCursos(): Promise<ICurso[]> {
        const query: string = 'SELECT id, nome, categoria FROM cursos';
        const db = await this.db;
        const raw = db.prepare(query).all();
        if (!raw) {
            throw new Error('Falha ao executar a query: ' + query);
        }
        const cursos = CursoSchema.array().parse(raw);
        return cursos;
    }

    public async getCursoById(id: number): Promise<ICurso | null> {
        const query: string = 'SELECT id, nome, categoria FROM cursos WHERE id = ?';
        const db = await this.db;
        const raw = db.prepare(query).get(id);
        if (!raw) {
            return null;
        }
        const curso = CursoSchema.parse(raw);
        return curso;
    }

    public async createCurso(curso: ICurso): Promise<void> {
        const query: string = 'INSERT INTO cursos (nome, categoria) VALUES (?, ?)';
        const db = await this.db;
        const create = db.prepare(query);
        if (!create) {
            throw new Error('Falha ao executar a query de inserção: ' + query);
        }
        create.run(curso.nome, curso.categoria);
    }

    public async updateCurso(id: number, curso: ICurso): Promise<void> {
        const query: string = 'UPDATE cursos SET nome = ?, categoria = ? WHERE id = ?';
        const db = await this.db;
        const update = db.prepare(query);
        if (!update) {
            throw new Error('Falha ao executar a query de atualização: ' + query);
        }
        update.run(curso.nome, curso.categoria, id);
    }

    public async deleteCurso(id: number): Promise<void> {
        const query: string = 'DELETE FROM cursos WHERE id = ?';
        const db = await this.db;
        const del = db.prepare(query);
        if (!del) {
            throw new Error('Falha ao executar a query de exclusão: ' + query);
        }
        del.run(id);
    }
}

export default new CursoService();
