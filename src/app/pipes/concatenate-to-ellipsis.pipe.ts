import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'concatenateToEllipsis',
  pure: true
})
export class ConcatenateToEllipsisPipe implements PipeTransform {

  transform(value: string, limitTo?: number): string {
    if (value && limitTo && value.length > limitTo){
      return `${value.slice(0, limitTo)}...`;
    }
    return value;
  }
}
