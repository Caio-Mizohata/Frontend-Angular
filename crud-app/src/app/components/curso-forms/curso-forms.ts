import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AppMaterialModule } from "../../shared/app-material/app-material-module";
import { Curso } from '../../models/curso';
import { CursoService } from '../../services/curso-service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';

@Component({
  selector: 'app-curso-forms',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, AppMaterialModule],
  templateUrl: './curso-forms.html',
  styleUrls: ['./curso-forms.scss'],
})
export class CursoForms {
  private cursoService: CursoService = inject(CursoService);
  private _snackBar = inject(MatSnackBar);
  private Location = inject(Location);

  cursoForm = new FormGroup({
    nome: new FormControl<string>('', { nonNullable: true }),
    categoria: new FormControl<string>('', { nonNullable: true }),
  });

  onSubmit() {
    return this.cursoService.salvar(this.cursoForm.value).subscribe({
      next: (curso) => {
        console.log('Curso salvo com sucesso:', curso);
        this.cursoForm.reset();
        this.OnCancel();
      },
      error: (error) => {
        console.error('Erro ao salvar curso:', error);
        this.OnError('Erro ao salvar curso. Se o problema persistir, contate o suporte.');
      }
    })
  }

  OnCancel(): void {
    this.Location.back();
  }

  private OnError(errorMsg: string) {
    return this._snackBar.open(errorMsg, 'Fechar', {
      duration: 5000,
    });
  }
}
