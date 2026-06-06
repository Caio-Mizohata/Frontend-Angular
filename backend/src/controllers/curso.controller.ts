import CursoService from '../services/curso.service';
import type { ICurso } from '../interfaces/curso.interface';
import { CursoSchema } from '../schemas/curso.schema';
import { Request, Response } from 'express';


const colors: Record<string, string> = {
    red: '\x1b[31m',
    green: '\x1b[32m',
    reset: '\x1b[0m',
    bold: '\x1b[1m',
};

class CursoController {
    private cursoService: typeof CursoService;

    constructor() {
        this.cursoService = CursoService;
        this.getAllCursos = this.getAllCursos.bind(this);
        this.getCursoById = this.getCursoById.bind(this);
        this.createCurso = this.createCurso.bind(this);
        this.updateCurso = this.updateCurso.bind(this);
        this.deleteCurso = this.deleteCurso.bind(this);
    }

    private logRequest(req: Request, statusCode: number, message: string): void {
        const statusColor = statusCode >= 500 ? colors.red : (statusCode >= 400 ? colors.red : (statusCode >= 200 ? colors.green : colors.reset));
        const requestStr = `${colors.bold}"${req.method} ${req.originalUrl}"${colors.reset}`;
        const statusStr = `${statusColor}${statusCode}${colors.reset}`;
        const msg = `${colors.bold}${message}${colors.reset}`;
        console.log(`${requestStr} ${statusStr} - ${msg}`);
    }

    public getAllCursos = async (req: Request, res: Response): Promise<void> => {
        try {
            const cursos = await this.cursoService.getAllCursos();
            if (!cursos || cursos.length === 0) {
                this.logRequest(req, 404, 'Nenhum curso encontrado');
                res.status(404).json({ message: 'Nenhum curso encontrado' });
                return;
            }
            this.logRequest(req, 200, `Cursos retornados: ${cursos.length}`);
            res.status(200).json(cursos);
        } catch (error) {
            this.logRequest(req, 500, 'Erro ao obter os cursos');
            throw new Error('Erro ao obter os cursos: ' + error);
        }
    }

    public getCursoById = async (req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params;
            const idNum = Number(id);
            if (Number.isNaN(idNum)) {
                res.status(400).json({ message: 'ID inválido' });
                return;
            }

            const curso = await this.cursoService.getCursoById(idNum);
            if (!curso) {
                this.logRequest(req, 404, 'Curso não encontrado');
                res.status(404).json({ message: 'Curso não encontrado' });
                return;
            }
            this.logRequest(req, 200, `Curso retornado: ${curso.nome}`);
            res.status(200).json(curso);
        } catch (error) {
            this.logRequest(req, 500, 'Erro ao obter o curso');
            throw new Error('Erro ao obter o curso: ' + error);
        }
    }

    public createCurso = async (req: Request, res: Response): Promise<void> => {
        try {
            const cursoData = CursoSchema.safeParse(req.body);
            if (!cursoData.success) {
                res.status(400).json({ message: 'Erro na validação dos dados', errors: cursoData.error });
                return;
            }
            const { nome, categoria } = cursoData.data;
            if (!nome || !categoria) {
                this.logRequest(req, 400, 'Nome e categoria são obrigatórios');
                res.status(400).json({ message: 'Nome e categoria são obrigatórios' });
                return;
            }
            await this.cursoService.createCurso(cursoData.data);
            this.logRequest(req, 201, `Curso criado: ${cursoData.data.nome}`);
            res.status(201).json({ message: 'Curso criado com sucesso' });
        } catch (error) {
            this.logRequest(req, 500, 'Erro ao criar o curso');
            res.status(400).json({ message: 'Erro ao criar o curso: ' + error });
        }
    }

    public updateCurso = async (req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params;
            const idNum = Number(id);
            if (Number.isNaN(idNum)) {
                res.status(400).json({ message: 'ID inválido' });
                return;
            }
            const existingCurso = await this.cursoService.getCursoById(idNum);
            if (!existingCurso) {
                this.logRequest(req, 404, 'Curso não encontrado');
                res.status(404).json({ message: 'Curso não encontrado' });
                return;
            }

            const parseResult = CursoSchema.partial().safeParse(req.body);
            if (!parseResult.success) {
                res.status(400).json({ message: 'Erro na validação dos dados', errors: parseResult.error });
                return;
            }
            const cursoData = parseResult.data;
            const { nome, categoria } = cursoData;
            const updatedData: ICurso = {
                nome: nome ?? existingCurso.nome,
                categoria: categoria ?? existingCurso.categoria,
            };
            await this.cursoService.updateCurso(idNum, updatedData);
            this.logRequest(req, 200, `Curso atualizado: ${updatedData.nome}`);
            res.status(200).json({ message: 'Curso atualizado com sucesso' });
        } catch (error) {
            this.logRequest(req, 500, 'Erro ao atualizar o curso');
            res.status(400).json({ message: 'Erro ao atualizar o curso: ' + error });
        }
    }

    public deleteCurso = async (req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params;
            const idNum = Number(id);
            if (Number.isNaN(idNum)) {
                res.status(400).json({ message: 'ID inválido' });
                return;
            }
            const existingCurso = await this.cursoService.getCursoById(idNum);
            if (!existingCurso) {
                this.logRequest(req, 404, 'Curso não encontrado');
                res.status(404).json({ message: 'Curso não encontrado' });
                return;
            }
            await this.cursoService.deleteCurso(idNum);
            this.logRequest(req, 200, `Curso excluído: ${existingCurso.nome}`);
            res.status(200).json({ message: 'Curso excluído com sucesso' });
        } catch (error) {
            this.logRequest(req, 500, 'Erro ao excluir o curso');
            res.status(400).json({ message: 'Erro ao excluir o curso: ' + error });
        }
    }
}

export default new CursoController();