import {
  Component,
  forwardRef,
  Input,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { YearModel, yearFactory } from './year-utils';

export const YEAR_RANGE = 4;

interface YearPickerStatus {
  disabled: boolean;
}

@Component({
  selector: 'year-picker',
  templateUrl: './year-picker.component.html',
  styleUrls: ['./year-picker.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(
        /* istanbul ignore next */
        () => YearPickerComponent
      ),
      multi: true
    }
  ]
})
export class YearPickerComponent implements OnInit, ControlValueAccessor {
  @Input()
  public minDate?: Date;

  @Input()
  public maxDate?: Date;

  private value: number;

  private yearSelect: YearModel;

  protected years: YearModel[] = [];

  protected minYearRange: number;

  protected maxYearRange: number;

  protected status: YearPickerStatus;

  private onChange = (_?: number): void => undefined;

  private onTouched = (_?: boolean): void => undefined;

  constructor() {
    this.value = new Date().getFullYear();

    this.minYearRange = this.value;
    this.maxYearRange = this.value;

    this.yearSelect = this.buildModel(this.value);

    this.status = {
      disabled: false
    };
  }

  public ngOnInit(): void {
    this.renderComponent(this.value);
  }

  public onClickYear(yearModel: YearModel): void {
    if (yearModel.value) {
      this.approvedValue(yearModel.value);

      this.onChange(yearModel.value);
      this.onTouched(true);
    }
  }

  public onClickPrev(): void {
    if (this.yearSelect.value) {
      let yearCenter = this.yearSelect.value - YEAR_RANGE * 2;

      if (this.isOverflowMin(yearCenter)) {
        yearCenter = this.minYear;
      }

      this.renderComponent(yearCenter);
    }
  }

  public onClickNext(): void {
    if (this.yearSelect.value) {
      let yearCenter = this.yearSelect.value + YEAR_RANGE * 2;

      if (this.isOverflowMax(yearCenter)) {
        yearCenter = this.maxYear;
      }

      this.renderComponent(yearCenter);
    }
  }

  public get isPrevDisabled(): boolean {
    return this.minYear >= this.minYearRange;
  }

  public get isNextDisabled(): boolean {
    return this.maxYear <= this.maxYearRange;
  }

  private get minYear(): number {
    return this.minDate?.getFullYear() || 0;
  }

  private get maxYear(): number {
    return this.maxDate?.getFullYear() || 10000;
  }

  private setValue(value?: number): void {
    const year = this.getValue(value);

    this.isOverflow(year)
      ? this.recalculateValue(year)
      : this.approvedValue(year);
  }

  private getValue(value?: number): number {
    return value || new Date().getFullYear();
  }

  private approvedValue(value: number): void {
    this.value = value;

    this.renderComponent(value);
  }

  private recalculateValue(value: number): void {
    const valueYear = this.isOverflowMin(value) ? this.minYear : this.maxYear;

    this.approvedValue(valueYear);

    this.onChange(valueYear);
  }

  private renderComponent(year: number): void {
    this.minYearRange = year;
    this.maxYearRange = year;

    this.years = this.getArrayYears(year);
  }

  private getArrayYears(year: number): Array<YearModel> {
    const prevYears: Array<YearModel> = [];
    const nextYears: Array<YearModel> = [];

    for (let index = 0; index < YEAR_RANGE; index++) {
      const yearPrev = year - YEAR_RANGE + index;
      const yearNext = year + index + 1;

      const valuePrev = yearPrev >= this.minYear ? yearPrev : undefined;
      const valueNext = yearNext <= this.maxYear ? yearNext : undefined;

      const prevModel = this.buildModel(valuePrev);
      const nextModel = this.buildModel(valueNext);

      prevYears.push(prevModel);
      nextYears.push(nextModel);

      this.recalculateRangeYear(prevModel, nextModel);
    }

    const yearCenter = this.buildModel(year);

    this.onSelect(yearCenter);

    return prevYears.concat(yearCenter).concat(nextYears);
  }

  private buildModel(value?: number): YearModel {
    return yearFactory(value, !value, value === this.value);
  }

  private recalculateRangeYear(
    prevModel: YearModel,
    nextModel: YearModel
  ): void {
    if (!!prevModel.value && this.minYearRange > prevModel.value) {
      this.minYearRange = prevModel.value;
    }

    if (!!nextModel.value && this.maxYearRange < nextModel.value) {
      this.maxYearRange = nextModel.value;
    }
  }

  private onSelect(newYearSelect: YearModel): void {
    if (newYearSelect.value) {
      this.yearSelect.status.selected = false;

      this.yearSelect = newYearSelect;
    }
  }

  private isOverflow(year: number): boolean {
    return this.isOverflowMin(year) || this.isOverflowMax(year);
  }

  private isOverflowMin(year: number): boolean {
    return year < this.minYear;
  }

  private isOverflowMax(year: number): boolean {
    return year > this.maxYear;
  }

  public writeValue(value?: number): void {
    this.setValue(value);
  }

  public registerOnChange(onChange: (value?: number) => void): void {
    this.onChange = onChange;
  }

  public registerOnTouched(onTouched: (value?: boolean) => void): void {
    this.onTouched = onTouched;
  }

  public setDisabledState(disabled: boolean): void {
    this.status.disabled = disabled;
  }
}
