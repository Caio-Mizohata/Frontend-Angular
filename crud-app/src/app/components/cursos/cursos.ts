import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { Observable, of } from 'rxjs';
import { catchError, shareReplay } from 'rxjs/operators';

import { AppMaterialModule } from '../../shared/app-material/app-material-module';
import { ErrorDialog } from '../../shared/components/error-dialog/error-dialog';
import { Curso } from '../../models/curso';
import { CursoService } from '../../services/curso-service';

@Component({
  selector: 'app-cursos',
  standalone: true,
  imports: [CommonModule, AppMaterialModule, MatProgressSpinnerModule],
  templateUrl: './cursos.html',
  styleUrls: ['./cursos.scss'],
})
export class Cursos {
  private cursoService = inject(CursoService);
  private dialog = inject(MatDialog);

  cursos$: Observable<Curso[]>;
  colunas: string[] = ['id', 'name', 'categoria'];

  constructor() {
    this.cursos$ = this.cursoService.listar().pipe(
      catchError(() => {
        this.onError('Erro ao carregar cursos. Se o problema persistir, contate o suporte.');
        return of([]); // Retorna um array vazio em caso de erro
      }),
      shareReplay({ bufferSize: 1, refCount: true }),
    );
  }

  onError(errorMsg: string): void {
    this.dialog.open(ErrorDialog, {
      data: errorMsg,
    });
  }
}
