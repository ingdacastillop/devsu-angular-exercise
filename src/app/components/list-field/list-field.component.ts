import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { ListFieldElement } from './list-field-element';

const maxPositionVisible = 4;
const listSizeRem = 16;
const elementSizeRem = 4;
const baseSizePx = 16;
const elementSizePx = baseSizePx * elementSizeRem;
const maxListSizePx = baseSizePx * listSizeRem;

interface ListFieldStatus {
  active: boolean;
  hide: boolean;
  show: boolean;
  disabled: boolean;
}

@Component({ template: '' })
export class ListFieldComponent implements OnInit, ControlValueAccessor {
  @Input()
  public elementId?: string;

  @Input()
  public label = true;

  @Input()
  public placeholder = '';

  @Input()
  public suggestions: Array<ListFieldElement> = [];

  @Input()
  public sheetMode = false;

  protected declare inputElement: HTMLElement;

  private declare boxElement: HTMLElement;

  private declare listElement: HTMLElement;

  private declare elements: NodeListOf<HTMLElement>;

  private positionElement = 0;

  protected higher = true;

  protected value?: ListFieldElement;

  protected suggestion = '';

  protected status: ListFieldStatus;

  protected onChange = (_?: unknown): void => undefined;

  protected onTouch = (_?: unknown): void => undefined;

  constructor(protected ref: ElementRef) {
    this.status = {
      active: false,
      show: false,
      hide: true,
      disabled: false
    };
  }

  public ngOnInit(): void {
    this.ref.nativeElement.classList.add('list-field');

    this.boxElement = this.ref.nativeElement.querySelector(
      '.box-field__content'
    );

    this.inputElement = this.ref.nativeElement.querySelector('input');

    this.listElement = this.ref.nativeElement.querySelector('.list-field__ul');
  }

  public get isHigher(): boolean {
    return this.higher && !this.sheetMode;
  }

  public onBlur(): void {
    this.status.active = false;
  }

  public onFocus(): void {
    this.status.active = true;
  }

  public onClickBackdrop(): void {
    this.hideSuggestions();
  }

  protected focusInput(): void {
    if (!this.status.disabled) {
      this.inputElement?.focus();
    }
  }

  protected toogleSuggestions(): void {
    this.status.show ? this.hideSuggestions() : this.showSuggestions();
  }

  protected showSuggestions(): void {
    if (!this.status.disabled) {
      this.setVisibleSuggestions(true);
    }
  }

  protected hideSuggestions(): void {
    if (!this.status.disabled) {
      this.setVisibleSuggestions(false);
    }
  }

  protected setVisibleSuggestions(visible: boolean): void {
    this.status.show = visible;
    this.status.hide = !visible;
  }

  protected setDefineValue(element: ListFieldElement): void {
    this.setValue(element);

    this.onTouch(element.value);
    this.onChange(element.value);
  }

  protected setValue(element?: ListFieldElement): void {
    this.value = element;
    this.suggestion = element?.description || '';
  }

  protected navigationInput(event: KeyboardEvent): void {
    switch (event.code) {
      case 'ArrowUp':
        if (this.status.show && this.isHigher) {
          this.navigationInputUp();
        }
        break;

      case 'ArrowDown':
        if (this.status.show && !this.isHigher) {
          this.navigationInputDown();
        }
        break;
    }
  }

  protected navigationElement(event: KeyboardEvent): void {
    switch (event.code) {
      case 'ArrowUp':
        this.navigationElementUp();
        break;

      case 'ArrowDown':
        this.navigationElementDown();
        break;
    }
  }

  protected navigationInputUp(): void {
    this.elements = this.listElement?.querySelectorAll('.list-field__element');

    if (this.elements?.length) {
      this.positionElement = this.elements?.length - 1;

      this.elements?.item(this.positionElement).focus();

      if (this.positionElement > maxPositionVisible) {
        const elementPosition = this.elements?.length - maxPositionVisible;

        setTimeout(() => {
          this.listElement?.scroll({
            top: elementSizePx * elementPosition,
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  }

  protected navigationInputDown(): void {
    this.elements = this.listElement?.querySelectorAll('.list-field__element');

    if (this.elements?.length) {
      this.positionElement = 0;

      this.elements?.item(this.positionElement).focus();

      setTimeout(() => {
        this.listElement?.scroll({
          top: 0,
          behavior: 'smooth'
        });
      }, 100);
    }
  }

  protected navigationElementUp(): void {
    if (this.positionElement > 0) {
      this.positionElement--;

      this.elements?.item(this.positionElement).focus();
    } else if (!this.isHigher) {
      this.inputElement?.focus();
    }
  }

  protected navigationElementDown(): void {
    const newPosition = this.positionElement + 1;
    const length = this.elements?.length || 0;

    if (newPosition < length) {
      this.positionElement = newPosition;

      this.elements?.item(this.positionElement).focus();
    } else if (this.isHigher) {
      this.inputElement?.focus();
    }
  }

  private setDisabled(disabled: boolean): void {
    this.status.disabled = disabled;

    if (disabled) {
      this.setVisibleSuggestions(false);
    }
  }

  public writeValue(value?: unknown): void {
    let valueElement = undefined;

    if (value) {
      const [result] = this.suggestions.filter((el) => el.compareTo(value));

      valueElement = result;
    }

    this.setValue(valueElement);
  }

  public registerOnChange(onChange: (value?: unknown) => void): void {
    this.onChange = onChange;
  }

  public registerOnTouched(onTouch: (value?: unknown) => void): void {
    this.onTouch = onTouch;
  }

  public setDisabledState(disabled: boolean): void {
    this.setDisabled(disabled);
  }
}
