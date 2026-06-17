import { ResolveFn } from '@angular/router';
import { CursoService } from '../services/curso-service';
import { inject } from '@angular/core';
import { Curso } from '../models/curso';
import { of } from 'rxjs';

export const cursoResolver: ResolveFn<Curso> = (route, state) => {
  const cursoService = inject(CursoService);
  if (route.paramMap.has('id') && route.params['id'] !== null) {
    return cursoService.loadByID(route.params['id']);
  }
  return of({ id: null, nome: '', categoria: '' } as Curso);
};
