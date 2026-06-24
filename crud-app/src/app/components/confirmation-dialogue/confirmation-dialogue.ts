import { Component, inject } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

export interface DialogData {
  titulo: string;
  mensagem: string;
  confirmButtonText: string;
  cancelButtonText: string;
}

@Component({
  selector: 'app-confirmation-dialogue',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './confirmation-dialogue.html',
  styleUrls: ['./confirmation-dialogue.scss'],
})
export class ConfirmationDialogue {
  readonly dialogRef = inject(MatDialogRef<ConfirmationDialogue>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);

  onNoClick(result: boolean): void {
    this.dialogRef.close(result);
  }
}
