import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'colorStatus'
})
export class ColorStatusPipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {

    switch (value) {
      case 'CADASTRADA': {
        return 'info';
      }
      case 'ANALISADA': {
        return 'success';
      }
      case 'PLANEJADA': {
        return 'warning';
      }
      default: {
        return 'info'
      }
    }
  }
}
