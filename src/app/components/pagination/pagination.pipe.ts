import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'paginationPipe'
})
export class PaginationPipe implements PipeTransform {
  public transform(suggestions: Array<any>, filter: string) {
    return suggestions;
  }
}
