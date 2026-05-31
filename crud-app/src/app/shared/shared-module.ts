import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppMaterialModule } from './app-material/app-material-module';
import { ErrorDialog } from './components/error-dialog/error-dialog';
import { CategoryPipe } from './pipes/category-pipe';

@NgModule({
  imports: [CommonModule, AppMaterialModule, ErrorDialog, CategoryPipe],
  exports: [AppMaterialModule, ErrorDialog, CategoryPipe],
})
export class SharedModule {}
