import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'category',
})
export class CategoryPipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): string {
    switch (value) {
      case 'Frontend':
        return 'code';
      case 'Backend':
        return 'dns';
      default:
        return value;
    }
  }
}
