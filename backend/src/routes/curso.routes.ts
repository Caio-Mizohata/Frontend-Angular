import { Router } from 'express';
import CursoController from '../controllers/curso.controller';

const cursoRoutes: Router = Router();

cursoRoutes.get('/cursos', CursoController.getAllCursos);
cursoRoutes.post('/cursos', CursoController.createCurso);

export default cursoRoutes;