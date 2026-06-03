import { Router } from 'express';
import CursoController from '../controllers/curso.controller';

const cursoRoutes: Router = Router();

cursoRoutes.get('/cursos', CursoController.getAllCursos);
cursoRoutes.get('/cursos/:id', CursoController.getCursoById);
cursoRoutes.post('/cursos', CursoController.createCurso);
cursoRoutes.put('/cursos/:id', CursoController.updateCurso);
cursoRoutes.delete('/cursos/:id', CursoController.deleteCurso);

export default cursoRoutes;