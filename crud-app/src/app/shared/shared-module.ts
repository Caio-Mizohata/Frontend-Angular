import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppMaterialModule } from './app-material/app-material-module';
import { ErrorDialog } from './components/error-dialog/error-dialog';

@NgModule({
  imports: [CommonModule, AppMaterialModule, ErrorDialog],
  exports: [AppMaterialModule, ErrorDialog],
})
export class SharedModule {}
