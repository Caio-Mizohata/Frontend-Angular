import zod from 'zod';

export const CursoSchema = zod.object({
    nome: zod.string(),
    categoria: zod.string()
});
