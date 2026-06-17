import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { Observable, of } from 'rxjs';
import { catchError, shareReplay } from 'rxjs/operators';

import { AppMaterialModule } from '../../shared/app-material/app-material-module';
import { ErrorDialog } from '../../shared/components/error-dialog/error-dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Curso } from '../../models/curso';
import { CursoService } from '../../services/curso-service';
import { Router } from '@angular/router';
import { CursoList } from '../curso-list/curso-list';


@Component({
  selector: 'app-cursos',
  standalone: true,
  imports: [CommonModule, AppMaterialModule, MatProgressSpinnerModule, CursoList],
  templateUrl: './cursos.html',
  styleUrls: ['./cursos.scss'],
})
export class Cursos {
  private cursoService = inject(CursoService);
  private dialog = inject(MatDialog);
  private router = inject(Router);
  private _snackBar = inject(MatSnackBar);

  cursos$: Observable<Curso[]>;
  readonly colunas: string[] = ['nome', 'categoria', 'actions'];

  constructor() {
    this.cursos$ = this.cursoService.listar().pipe(
      catchError(() => {
        this.onError('Erro ao carregar cursos. Se o problema persistir, contate o suporte.');
        return of([]); // Retorna um array vazio em caso de erro
      }),
      shareReplay({ bufferSize: 1, refCount: true }),
    );
  }

  private refresh(): void {
    this.cursos$ = this.cursoService.listar().pipe(
      catchError(() => {
        this.onError('Erro ao carregar cursos. Se o problema persistir, contate o suporte.');
        return of([]); // Retorna um array vazio em caso de erro
      }),
    );
  }

    onDelete(curso: Curso): void {
    this.cursoService.delete(curso.id!).subscribe({
      next: () => {
        this.refresh();
        this._snackBar.open('Curso excluído com sucesso.', 'Fechar', {
          duration: 5000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
        });
      },
      error: this.onError.bind(this, 'Erro ao excluir curso. Se o problema persistir, contate o suporte.'),
    });
  }

  private onError(errorMsg: string): void {
    this.dialog.open(ErrorDialog, {
      data: errorMsg,
    });
  }

  onAdd(): void {
    this.router.navigateByUrl('/new');
  }

  onEdit(curso: Curso): void {
    this.router.navigateByUrl(`/edit/${curso.id}`);
  }
}
