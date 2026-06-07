import { Injectable, inject } from '@angular/core';
import { Curso } from '../models/curso';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { delay, first } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class CursoService {
  private readonly API_URL = 'http://localhost:3000/cursos';
  httpClient = inject(HttpClient);
  constructor() {}

  listar(): Observable<Curso[]> {
    return this.httpClient.get<Curso[]>(this.API_URL).pipe(
      first(), // Garante que a requisição seja feita apenas uma vez
      delay(2000), // Simula um atraso de 2 segundos para demonstrar o spinner
      catchError(error => {
        console.error('Erro ao listar cursos:', error);
        return throwError(() => new Error('Erro ao listar cursos'));
      })
    )
  }
}
