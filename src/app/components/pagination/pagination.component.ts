import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import { PaginationPipe } from './pagination.pipe';

export const COUNT_ELEMENT_DEFAULT = 25;
export const FIRST_PAGE = 0;
export const COUNT_PAGE = 1;
export const MAX_PAGE_VISIBLE = 4;

interface PaginationPageStatus {
  active: boolean;
}

export interface PaginationPage {
  label: string;
  value: number;
  status: PaginationPageStatus;
  prev?: PaginationPage;
  next?: PaginationPage;
}

export interface PaginationChanged<T = unknown> {
  index: number;
  count: number;
  collection: T[];
  suggestions: T[];
}

@Component({
  selector: 'pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PaginationComponent<T = unknown> implements OnInit, OnChanges {
  @Input()
  public suggestions: T[] = [];

  @Input()
  public count: number = COUNT_ELEMENT_DEFAULT;

  @Input()
  public index = 0;

  @Input()
  public filter = '';

  @Input()
  public label = 'elemento(s)';

  @Output()
  public results: EventEmitter<T[]>;

  private currentValue: T[] = [];

  private collection: T[] = [];

  private pagesValue: Array<PaginationPage> = [];

  private currentPage?: PaginationPage;

  private maxPage = 0;

  private descriptionValue = '';

  constructor(private paginationPipe: PaginationPipe<T>) {
    this.results = new EventEmitter<T[]>();
  }

  public ngOnInit(): void {
    this.resetPropsSuggestions(this.suggestions);
  }

  public ngOnChanges(changes: SimpleChanges): void {
    this.changeStatusSuggestions(changes);
    this.changeStatusCount(changes);
    this.changeStatusFilter(changes);
  }

  public get value(): T[] {
    return this.currentValue;
  }

  public get pages(): Array<PaginationPage> {
    return this.pagesValue;
  }

  public get description(): string {
    return this.descriptionValue;
  }

  public get isEmpty(): boolean {
    return this.suggestions.length === 0;
  }

  public get isFirstPage(): boolean {
    return this.currentPage?.value === FIRST_PAGE;
  }

  public get isLastPage(): boolean {
    return this.currentPage?.value === this.maxPage - 1;
  }

  public onClickPage(page: PaginationPage): void {
    if (this.currentPage) {
      this.currentPage.status.active = false;
    }

    this.onSelectPage(page);
  }

  public onClickFirst(): void {
    if (this.collection.length) {
      this.resetPropsComponent(this.newIndex(FIRST_PAGE), false, true);
    }
  }

  public onClickPrev(): void {
    if (this.currentPage) {
      if (!this.currentPage.prev) {
        const prevIndex = this.currentPage.value - COUNT_PAGE;

        if (prevIndex >= FIRST_PAGE) {
          this.resetPropsComponent(this.newIndex(prevIndex), false, true);
        }
      } else {
        this.currentPage.status.active = false;

        this.onSelectPage(this.currentPage.prev);
      }
    }
  }

  public onClickNext(): void {
    if (this.currentPage) {
      if (!this.currentPage.next) {
        const nextIndex = this.currentPage.value + 1;

        if (nextIndex <= this.maxPage) {
          this.resetPropsComponent(this.newIndex(nextIndex), false, true);
        }
      } else {
        this.currentPage.status.active = false;

        this.onSelectPage(this.currentPage.next);
      }
    }
  }

  public onClickLast(): void {
    if (this.collection.length) {
      const changed = this.newIndex(this.maxPage - COUNT_PAGE);

      this.resetPropsComponent(changed, false, true);
    }
  }

  private changeStatusSuggestions(changes: SimpleChanges): void {
    if (changes['suggestions']) {
      this.resetPropsSuggestions(changes['suggestions'].currentValue);
    }
  }

  private changeStatusCount(changes: SimpleChanges): void {
    if (changes['count']) {
      this.resetPropsCount(changes['count'].currentValue);
    }
  }

  private changeStatusFilter(changes: SimpleChanges): void {
    if (changes['filter']) {
      this.resetPropsFilter(changes['filter'].currentValue);
    }
  }

  private resetPropsSuggestions(suggestions: T[]): void {
    this.index = FIRST_PAGE;

    if (suggestions.length) {
      this.resetCollection(this.filter);

      const changed = this.newChanged({ suggestions });

      this.resetPropsComponent(changed, true, true);
    } else {
      this.rebootPropsComponent();
    }
  }

  private resetPropsCount(count: number): void {
    if (count < 0) {
      count = COUNT_ELEMENT_DEFAULT;
    }

    const changed = this.newChanged({ count });

    this.resetPropsComponent(changed, true, true);
  }

  private resetPropsFilter(filter: string): void {
    const collection = this.resetCollection(filter);

    const changed = this.newChanged({ collection });

    this.resetPropsComponent(changed, true, true);
  }

  private onSelectPage(page: PaginationPage): void {
    page.status.active = true;
    this.currentPage = page;

    const changed = this.newChanged({ index: page.value });

    this.resetPropsComponent(changed);
  }

  private resetCollection(filter: string): T[] {
    const result = this.paginationPipe.transform(this.suggestions, filter);

    this.collection = result;

    return result;
  }

  private rebootPropsComponent(): void {
    this.pagesValue = [];
    this.collection = [];
    this.maxPage = 0;

    this.setValue([]);
  }

  private resetPropsComponent(
    changed: PaginationChanged<T>,
    maxPage = false,
    buildPage = false
  ): void {
    if (maxPage) {
      this.maxPage = this.getMaxPage(changed.collection, changed.count);
    }

    if (buildPage) {
      this.buildPages(changed);
    }

    const newValue = this.getValue(changed);

    this.setValue(newValue);

    this.rebootDescription(changed);
  }

  private setValue(value: T[]): void {
    this.currentValue = value;

    this.results.emit(value);
  }

  private getValue(changed: PaginationChanged<T>): T[] {
    if (changed.collection.length === 0) {
      return [];
    } else {
      const endIndex = (changed.index + COUNT_PAGE) * changed.count;
      const startIndex = changed.index * changed.count;

      return changed.collection.slice(startIndex, endIndex);
    }
  }

  private rebootDescription(changed: PaginationChanged): void {
    const count = changed.suggestions.length;

    const start = changed.index * changed.count + COUNT_PAGE;
    let end = (changed.index + COUNT_PAGE) * changed.count;

    if (end > changed.collection.length) {
      end = changed.collection.length;
    }

    this.descriptionValue = `${start} - ${end} de ${count} ${this.label}`;
  }

  private buildPages(changed: PaginationChanged): void {
    let maxPageVisible = changed.index + MAX_PAGE_VISIBLE;

    if (maxPageVisible > this.maxPage) {
      maxPageVisible = this.maxPage;
    }

    let minIndexPage = maxPageVisible - MAX_PAGE_VISIBLE;

    if (minIndexPage < 0) {
      minIndexPage = 0;
    }

    if (minIndexPage > changed.index) {
      minIndexPage = changed.index;
    }

    this.currentPage = undefined;
    this.pagesValue = [];
    let prevPage = undefined;

    for (let index = minIndexPage; index < maxPageVisible; index++) {
      const newPage = this.getPage(index);

      if (index === changed.index) {
        newPage.status.active = true;

        this.currentPage = newPage;
      }

      this.pagesValue.push(newPage);

      newPage.prev = prevPage;

      if (prevPage) {
        (prevPage as PaginationPage).next = newPage;
      }

      prevPage = newPage;
    }
  }

  private getPage(value: number): PaginationPage {
    return {
      label: (value + 1).toString(),
      value,
      status: {
        active: false
      }
    };
  }

  private getMaxPage(collection: T[], count: number): number {
    if (collection.length === 0) {
      return 0;
    }

    const value = collection.length / count;
    let maxPage = parseInt(value.toString());

    if (collection.length % count > 0) {
      maxPage++;
    }

    return maxPage;
  }

  private newIndex(index: number): PaginationChanged<T> {
    return this.newChanged({ index });
  }

  private newChanged({
    suggestions,
    index,
    count,
    collection
  }: {
    suggestions?: T[];
    index?: number;
    count?: number;
    collection?: T[];
  }): PaginationChanged<T> {
    return {
      suggestions: suggestions || this.suggestions,
      collection: collection || this.collection,
      index: index || this.index,
      count: count || this.count
    };
  }
}
