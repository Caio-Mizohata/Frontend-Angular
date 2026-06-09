import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { signal } from '@angular/core';
import { Curso } from '../../models/curso';
import { form, required } from '@angular/forms/signals';
import { MatFormFieldModule}  from '@angular/material/form-field';

@Component({
  selector: 'app-curso-forms',
  imports: [ReactiveFormsModule, MatFormFieldModule],
  templateUrl: './curso-forms.html',
  styleUrl: './curso-forms.scss',
})
export class CursoForms {

  protected readonly curso = signal<Curso>({
    nome: '',
    categoria:'',
  })

  cursoForm = form(this.curso, (schemaPath) => {
    required(schemaPath.nome, {message: 'O nome é obrigatório'});
    required(schemaPath.categoria, {message: 'A categoria é obrigatória'});
  });

}
