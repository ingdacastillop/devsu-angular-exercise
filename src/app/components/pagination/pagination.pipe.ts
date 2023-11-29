import { Pipe, PipeTransform } from '@angular/core';

const normalize = (word: string): string => {
  return word
    .slice()
    .replace('á', 'a')
    .replace('Á', 'A')
    .replace('é', 'e')
    .replace('É', 'E')
    .replace('í', 'i')
    .replace('Í', 'I')
    .replace('ó', 'o')
    .replace('Ó', 'O')
    .replace('ú', 'u')
    .replace('Ú', 'U');
};

const hasPattern = (word: string, pattern: string, force = false): boolean => {
  let filter = pattern.toLowerCase();
  let test = word.toLowerCase();

  if (force) {
    test = normalize(test);
    filter = normalize(filter);
  }

  return !!test.match(`^.*${filter}.*$`);
};

@Pipe({ name: 'paginationPipe' })
export class PaginationPipe<T> implements PipeTransform {
  public transform(suggestions: T[], filter: string) {
    if (filter) {
      return suggestions.filter((suggestion) =>
        hasPattern(JSON.stringify(suggestion), filter)
      );
    }

    return suggestions;
  }
}
