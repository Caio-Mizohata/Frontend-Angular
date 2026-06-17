import { Routes } from '@angular/router';
import { cursoResolver } from './resolvers/curso-resolver';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'cursos' },
  {
    path: 'cursos',
    loadComponent: () => import('./components/cursos/cursos').then(m => m.Cursos)
  },
  {
    path: 'new',
    loadComponent: () => import('./components/curso-forms/curso-forms').then(m => m.CursoForms),
    resolve: {
      curso: cursoResolver
    }
  },
  {
    path: 'edit/:id',
    loadComponent: () => import('./components/curso-forms/curso-forms').then(m => m.CursoForms),
    resolve: {
      curso: cursoResolver
    }
  },
];
