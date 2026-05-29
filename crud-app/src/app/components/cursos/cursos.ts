import { Component, inject } from '@angular/core';
import { Curso } from '../../models/curso';
import { CommonModule } from '@angular/common';
import { AppMaterialModule } from '../../shared/app-material/app-material-module';
import { CursoService } from '../../services/curso-service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cursos',
  standalone: true,
  imports: [CommonModule, AppMaterialModule],
  templateUrl: './cursos.html',
  styleUrls: ['./cursos.scss'],
})
export class Cursos {
  private cursoService = inject(CursoService);
  cursos: Observable<Curso[]>;
  colunas: string[] = ['id', 'name', 'categoria'];

  constructor() {
    this.cursos = this.cursoService.listar();
  }

  cursosMock(): Observable<Curso[]> {
    return this.cursos;
  }
}
