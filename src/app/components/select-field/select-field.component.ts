import {
  Component,
  forwardRef,
  HostListener,
  ViewEncapsulation
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ListFieldElement } from '../list-field/list-field-element';
import { ListFieldComponent } from '../list-field/list-field.component';

@Component({
  selector: 'select-field',
  templateUrl: './select-field.component.html',
  styleUrls: [
    '../list-field/list-field.component.scss',
    './select-field.component.scss'
  ],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(
        /* istanbul ignore next */
        () => SelectFieldComponent
      ),
      multi: true
    }
  ]
})
export class SelectFieldComponent extends ListFieldComponent {
  @HostListener('document:click', ['$event.target'])
  public onClickDocument(element: HTMLElement) {
    if (!this.ref.nativeElement.contains(element)) {
      this.hideSuggestions();
    }
  }

  public onClickInput(): void {
    this.showSuggestions();
  }

  public onClickAction() {
    this.toogleSuggestions();

    if (this.status.show) {
      this.focusInput();
    }
  }

  public onSelect(element: ListFieldElement): void {
    this.hideSuggestions();

    this.setDefineValue(element);
  }
}
