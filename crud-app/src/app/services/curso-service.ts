import { Injectable, inject } from '@angular/core';
import { Curso } from '../models/curso';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { delay, first } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class CursoService {
  private readonly API_URL: string = 'http://localhost:3000/cursos';
  httpClient = inject(HttpClient);

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

  loadByID(id: number): Observable<Curso> {
    return this.httpClient.get<Curso>(`${this.API_URL}/${id}`).pipe(
      first(),
      catchError(error => {
        console.error(`Erro ao carregar curso com ID ${id}:`, error);
        return throwError(() => new Error('Erro ao carregar curso'));
      })
    );
  }

  salvar(curso: Partial<Curso>): Observable<Curso> {
    if (curso.id) {
      return this.update(curso);
    }
    return this.criar(curso);
  }

  private criar(curso: Partial<Curso>): Observable<Curso> {
    const { id, ...cursoSemId } = curso; // Remove o campo 'id' do objeto
    return this.httpClient.post<Curso>(this.API_URL, cursoSemId).pipe(
      first(),
      catchError(error => {
        console.error('Erro ao criar curso:', error);
        return throwError(() => new Error('Erro ao criar curso'));
      }
    ));
  }

  private update(curso: Partial<Curso>): Observable<Curso> {
    return this.httpClient.put<Curso>(`${this.API_URL}/${curso.id}`, curso).pipe(
      first(),
      catchError(error => {
        console.error('Erro ao atualizar curso:', error);
        return throwError(() => new Error('Erro ao atualizar curso'));
      })
    );
  }


  delete(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.API_URL}/${id}`).pipe(
      first(),
      catchError(error => {
        console.error(`Erro ao deletar curso com ID ${id}:`, error);
        return throwError(() => new Error('Erro ao deletar curso'));
      })
    );
  }
}
