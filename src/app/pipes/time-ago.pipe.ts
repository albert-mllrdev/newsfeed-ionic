import { Pipe, PipeTransform } from '@angular/core';
import { formatDistanceToNowStrict } from 'date-fns';

@Pipe({
  name: 'timeAgo',
  pure: false
})
export class TimeAgoPipe implements PipeTransform {
  transform(value: Date): string {
    const sourceDate = new Date(value);
    const timeAgo = `${formatDistanceToNowStrict(sourceDate, { addSuffix : true})}`;
    if (timeAgo.toLowerCase() === '0 seconds ago'){
      return 'just now';
    }
    return timeAgo;
   }
}
