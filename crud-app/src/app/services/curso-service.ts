import { Injectable } from '@angular/core';
import { Curso } from '../models/curso';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CursoService {
  private readonly API_URL = 'assets/cursos.json';
  constructor(private httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  listar(): Observable<Curso[]> {
    return this.httpClient.get<Curso[]>(this.API_URL).pipe(
      tap(cursos => console.log('Cursos listados:', cursos)),
      catchError(error => {
        console.error('Erro ao listar cursos:', error);
        return throwError(() => new Error('Erro ao listar cursos'));
      })
    )
  }
}
