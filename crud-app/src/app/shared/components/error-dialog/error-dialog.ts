import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-error-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './error-dialog.html',
  styleUrls: ['./error-dialog.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorDialog {
  readonly message = inject(MAT_DIALOG_DATA) as string;
}
