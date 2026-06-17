import zod from 'zod';

export const CursoSchema = zod.object({
    id: zod.number().optional(),
    nome: zod.string(),
    categoria: zod.string()
});
