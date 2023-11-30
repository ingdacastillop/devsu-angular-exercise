import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { ListFieldElement } from './list-field-element';

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
  public suggestions: ListFieldElement[] = [];

  @Input()
  public sheetMode = false;

  protected declare inputElement: HTMLElement;

  private declare boxElement: HTMLElement;

  private declare listElement: HTMLElement;

  private declare elements: NodeListOf<HTMLElement>;

  protected value?: ListFieldElement;

  protected suggestion = '';

  protected status: ListFieldStatus;

  protected onChange = (_?: unknown): void => undefined;

  protected onTouched = (_?: boolean): void => undefined;

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
      this.onTouched(true);
    }
  }

  protected setVisibleSuggestions(visible: boolean): void {
    this.status.show = visible;
    this.status.hide = !visible;
  }

  protected setDefineValue(element: ListFieldElement): void {
    this.setValue(element);

    this.onChange(element.value);
  }

  protected setValue(element?: ListFieldElement): void {
    this.value = element;
    this.suggestion = element?.description || '';
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

  public registerOnTouched(onTouched: (value?: boolean) => void): void {
    this.onTouched = onTouched;
  }

  public setDisabledState(disabled: boolean): void {
    this.setDisabled(disabled);
  }
}
