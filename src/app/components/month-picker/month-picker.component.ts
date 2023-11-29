import {
  Component,
  ElementRef,
  forwardRef,
  Input,
  OnChanges,
  OnInit,
  Renderer2,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MonthModel, MONTHS } from './month-utils';

interface MonthPickerStatus {
  disabled: boolean;
}

export const MONTH_MIN = 0;
export const MONTH_MAX = 11;

@Component({
  selector: 'month-picker',
  templateUrl: './month-picker.component.html',
  styleUrls: ['./month-picker.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MonthPickerComponent),
      multi: true
    }
  ]
})
export class MonthPickerComponent implements OnChanges, ControlValueAccessor {
  @Input()
  public readonly = false;

  @Input()
  public date = new Date();

  @Input()
  public minDate?: Date;

  @Input()
  public maxDate?: Date;

  protected value: number;

  protected months = MONTHS;

  protected status: MonthPickerStatus;

  private onChange = (_?: number): void => undefined;

  private onTouch = (_?: number): void => undefined;

  constructor(private ref: ElementRef, private renderer: Renderer2) {
    this.value = this.date.getMonth();

    this.status = {
      disabled: false
    };
  }

  public ngOnChanges(changes: SimpleChanges): void {
    this.changeStatusDate(changes);
  }

  public get minYear(): number {
    return this.minDate?.getFullYear() || 0;
  }

  public get maxYear(): number {
    return this.maxDate?.getFullYear() || 10000;
  }

  public get minMonth(): number {
    return this.minDate?.getMonth() || MONTH_MIN;
  }

  public get maxMonth(): number {
    return this.maxDate?.getMonth() || MONTH_MAX;
  }

  public isSelected(month: MonthModel): boolean {
    return this.value === month.value;
  }

  public isDisabled(month: MonthModel): boolean {
    return this.isOverflow(this.date, month.value);
  }

  public onClickMonth({ value }: MonthModel): void {
    this.approvedValue(value);

    this.onTouch(value);
    this.onChange(value);
  }

  private changeStatusDate(changes: SimpleChanges): void {
    if (changes['date']) {
      const date = changes['date'].currentValue;

      if (date && this.isOverflow(date, this.value)) {
        this.recalculateValue(date, this.value);
      }
    }
  }

  private setValue(value?: number): void {
    const month = this.getValue(value);

    this.isOverflow(this.date, month)
      ? this.recalculateValue(this.date, month)
      : this.approvedValue(month);
  }

  private getValue(value?: number): number {
    return value || new Date().getMonth();
  }

  private approvedValue(value: number): void {
    this.value = value;
  }

  private recalculateValue(date: Date, value: number): void {
    const month = this.isOverflowMin(date, value)
      ? this.minMonth
      : this.maxMonth;

    this.onChange(month);
    this.onTouch(month);

    this.approvedValue(month);
  }

  private isOverflow(date: Date, month: number): boolean {
    return this.isOverflowMin(date, month) || this.isOverflowMax(date, month);
  }

  private isOverflowMin(date: Date, month: number): boolean {
    return date.getFullYear() === this.minYear && month < this.minMonth;
  }

  private isOverflowMax(date: Date, month: number): boolean {
    return date.getFullYear() === this.maxYear && month > this.maxMonth;
  }

  public writeValue(value?: number): void {
    this.setValue(value);
  }

  public registerOnChange(onChange: (value?: number) => void): void {
    this.onChange = onChange;
  }

  public registerOnTouched(onTouch: (value?: number) => void): void {
    this.onTouch = onTouch;
  }

  public setDisabledState(disabled: boolean): void {
    this.status.disabled = disabled;
  }
}
