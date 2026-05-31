import CursoService from '../services/curso.service';
import type { ICurso } from '../interfaces/curso.interface';
import { CursoSchema } from '../schemas/curso.schema';
import { Request, Response } from 'express';

class CursoController {
    private cursoService: typeof CursoService;

    constructor() {
        this.cursoService = CursoService;
        this.getAllCursos = this.getAllCursos.bind(this);
        this.createCurso = this.createCurso.bind(this);
    }

    public getAllCursos = async (req: Request, res: Response): Promise<void> => {
        try {
            const cursos = await this.cursoService.getAllCursos();
            if (!cursos || cursos.length === 0) {
                res.status(404).json({ message: 'Nenhum curso encontrado' });
                return;
            }
            res.status(200).json(cursos);
        } catch (error) {
            throw new Error('Erro ao obter os cursos: ' + error);
        }
    }

    public createCurso = async (req: Request, res: Response): Promise<void> => {
        try {
            const cursoData = CursoSchema.parse(req.body);
            const { nome, categoria } = cursoData;
            if (!nome || !categoria) {
                res.status(400).json({ message: 'Nome e categoria são obrigatórios' });
                return;
            }
            await this.cursoService.createCurso(cursoData);
            res.status(201).json({ message: 'Curso criado com sucesso' });
        } catch (error) {
            res.status(400).json({ message: 'Erro ao criar o curso: ' + error });
        }
    }
}

export default new CursoController();