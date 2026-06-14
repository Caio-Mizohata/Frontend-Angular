import { Component, inject, Input } from '@angular/core';
import { Curso } from '../../models/curso';
import { Router } from '@angular/router';
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
  readonly colunas: string[] = ['nome', 'categoria', 'actions'];

  private router = inject(Router);


  onAdd(): void {
    this.router.navigateByUrl('/new');
  }
}
