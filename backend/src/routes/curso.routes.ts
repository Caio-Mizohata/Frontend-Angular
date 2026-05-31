import { Router } from 'express';

const cursoRoutes: Router = Router();

cursoRoutes.get('/', (req, res) => {
    res.json({ message: 'A Api de cursos ta funcionando!' });
});

export default cursoRoutes;