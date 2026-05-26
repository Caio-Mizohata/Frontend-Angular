import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatToolbarModule],
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
})
export class App {
  protected readonly title = signal('crud-app');
}
