import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppMaterialModule } from './app-material/app-material-module';
import { ErrorDialog } from './components/error-dialog/error-dialog';
import { CategoryPipe } from './pipes/category-pipe';
import { ConfirmationDialogue } from '../components/confirmation-dialogue/confirmation-dialogue';

@NgModule({
  imports: [CommonModule, AppMaterialModule, ErrorDialog, CategoryPipe, ConfirmationDialogue],
  exports: [AppMaterialModule, ErrorDialog, CategoryPipe, ConfirmationDialogue],
})
export class SharedModule {}
