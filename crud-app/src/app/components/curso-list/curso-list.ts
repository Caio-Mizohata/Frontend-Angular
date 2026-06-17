import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Curso } from '../../models/curso';
import { CommonModule } from '@angular/common';
import { AppMaterialModule } from '../../shared/app-material/app-material-module';
import { CategoryPipe } from '../../shared/pipes/category-pipe';

@Component({
  selector: 'app-curso-list',
  imports: [CommonModule, AppMaterialModule, CategoryPipe],
  templateUrl: './curso-list.html',
  styleUrls: ['./curso-list.scss'],
})
export class CursoList {
  @Input() cursos: Curso[] = [];
  @Output() add = new EventEmitter<boolean>(false);
  @Output() edit = new EventEmitter<Curso>();
  @Output() delete = new EventEmitter<Curso>();

  readonly colunas: string[] = ['nome', 'categoria', 'actions'];

  onAdd(): void {
    this.add.emit(true);
  }

  onEdit(curso: Curso): void {
    this.edit.emit(curso);
  }

  onDelete(curso: Curso): void {
    this.delete.emit(curso);
  }
}
