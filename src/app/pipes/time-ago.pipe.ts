import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeAgo',
  pure: false
})
export class TimeAgoPipe implements PipeTransform {
  transform(value: Date, exponent?: Date): string {
    const sourceDate = new Date(value);
    const now = new Date();

    const timeDifference = now.getTime() - sourceDate.getTime();

    const seconds = Math.floor(Math.abs((timeDifference / 1000)));
    const minutes = Math.floor(Math.abs(seconds / 60));
    const hours = Math.floor(Math.abs(minutes / 60));
    const days = Math.floor(Math.abs(hours / 24));
    const months = Math.floor(now.getMonth() - sourceDate.getMonth() + (12 * (now.getFullYear() - sourceDate.getFullYear())));
    const years = Math.floor(now.getFullYear() - sourceDate.getFullYear());

    if (seconds < 60) {
      return  (seconds <= 10) ? 'just now' : `${seconds} seconds ago`;
    }     

    if (minutes < 60) {
      return (minutes === 1) ? 'a minute ago' : `${minutes} minutes ago`;
    }

    if (hours < 24) {
      return (hours === 1) ? 'an hour ago' :  `${hours} hours ago`;
    }

    if (years < 1 && months < 1) {      
      return (days === 1) ? 'a day ago' : `${days} days ago`;
    }

    if (years < 1) {
      return (months < 1) ? 'a month ago' : `${months} month ago`;
    }
    return (years < 1) ? 'a year ago' : `${years} years ago`;
  }
}
