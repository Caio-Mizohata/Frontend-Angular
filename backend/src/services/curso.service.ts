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

    public async createCurso(curso: ICurso): Promise<void> {
        const query: string = 'INSERT INTO cursos (nome, categoria) VALUES (?, ?)';
        const db = await this.db;
        const create = db.prepare(query);
        if (!create) {
            throw new Error('Falha ao executar a query de inserção: ' + query);
        }
        create.run(curso.nome, curso.categoria);
    }
}

export default new CursoService();
