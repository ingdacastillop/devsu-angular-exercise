import {
  Component,
  forwardRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import {
  changeDay,
  DAYS_NAME_MIN,
  getDateWeight,
  getDaysMonth
} from '@xofttion/utils';
import { DayModel, DayPickerStatus, dayFactory, WeekModel } from './day-utils';

@Component({
  selector: 'day-picker',
  templateUrl: './day-picker.component.html',
  styleUrls: ['./day-picker.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DayPickerComponent),
      multi: true
    }
  ]
})
export class DayPickerComponent
  implements OnInit, OnChanges, ControlValueAccessor
{
  @Input()
  public date: Date;

  @Input()
  public minDate?: Date;

  @Input()
  public maxDate?: Date;

  protected value: number;

  protected status: DayPickerStatus;

  protected titles = DAYS_NAME_MIN;

  protected weeks: Array<WeekModel> = [];

  private dateStart = new Date();

  private onChange = (_?: number): void => undefined;

  private onTouch = (_?: number): void => undefined;

  constructor() {
    this.date = new Date();

    this.value = this.date.getDate();

    this.status = {
      disabled: false
    };
  }

  public ngOnInit(): void {
    this.dateStart.setDate(1);

    this.renderComponent();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    this.changeStatusDate(changes);
  }

  public isSelected({ value }: DayModel): boolean {
    return this.value === value;
  }

  public isDisabled(dayModel: DayModel): boolean {
    return dayModel.value ? this.isOverflow(this.date, dayModel.value) : true;
  }

  public onClickDay({ value }: DayModel): void {
    if (value) {
      this.setValue(value);

      this.onTouch(value);
      this.onChange(value);
    }
  }

  public get minDay(): number {
    return this.minDate ? this.minDate.getDate() : this.date.getDate();
  }

  public get maxDay(): number {
    return this.maxDate ? this.maxDate.getDate() : this.date.getDate();
  }

  public get minMonth(): number {
    return this.minDate ? this.minDate.getMonth() : this.date.getMonth();
  }

  public get maxMonth(): number {
    return this.maxDate ? this.maxDate.getMonth() : this.date.getMonth();
  }

  private setValue(value?: number): void {
    this.value = this.getValue(value);
  }

  private getValue(value?: number): number {
    return value || new Date().getDate();
  }

  private changeStatusDate(changes: SimpleChanges): void {
    if (changes['date']) {
      let dateValue = changes['date'].currentValue;

      if (this.isOverflow(dateValue, dateValue.getDate())) {
        dateValue = this.rebuildDate(dateValue);

        this.date = dateValue;

        this.onChange(this.date.getDate());
        this.onTouch(this.date.getDate());
      }

      this.dateStart.setFullYear(dateValue.getFullYear());
      this.dateStart.setMonth(dateValue.getMonth());

      this.setValue(dateValue.getDate());

      this.renderComponent();
    }
  }

  private rebuildDate(date: Date): Date {
    const newDate = new Date(date.getTime());

    if (this.isOverflowMin(date, date.getDate())) {
      newDate.setMonth(this.minMonth);
      newDate.setDate(this.minDay);
    } else {
      newDate.setMonth(this.maxMonth);
      newDate.setDate(this.maxDay);
    }

    return newDate;
  }

  private renderComponent(): void {
    const dayStart = this.dateStart.getDay();

    this.weeks = []; // Reiniciando semanas

    this.setFirstWeek(dayStart);
    this.setMiddleWeeks(dayStart);
  }

  private setFirstWeek(dayStart: number): void {
    const firstWeek: WeekModel = { days: [] };

    let day = 1;

    for (let start = 0; start < dayStart; start++) {
      firstWeek.days.push(this.getDayModel());
    }

    for (let end = dayStart; end < 7; end++) {
      firstWeek.days.push(this.getDayModel(day));

      day++;
    }

    this.weeks.push(firstWeek);
  }

  private setMiddleWeeks(dayStart: number): void {
    const dayCount = this.getDaysMonth();

    let day = 8 - dayStart;
    let week: WeekModel = { days: [] };
    let countDaysWeek = 1;

    do {
      week.days.push(this.getDayModel(day));

      day++;
      countDaysWeek++;

      if (countDaysWeek > 7) {
        this.weeks.push(week);

        countDaysWeek = 1;
        week = { days: [] };
      }
    } while (day <= dayCount);

    this.setLastWeek(week); // Completando semanas
  }

  private setLastWeek(week: WeekModel): void {
    if (week.days.length) {
      const length = 7 - week.days.length;

      for (let index = 0; index < length; index++) {
        week.days.push(this.getDayModel());
      }

      this.weeks.push(week);
    }
  }

  private getDaysMonth(): number {
    return getDaysMonth(this.date.getFullYear(), this.date.getMonth());
  }

  private getDayModel(value?: number): DayModel {
    return dayFactory(value, this.isOverflow(this.date, value || 0), !value);
  }

  private isOverflow(date: Date, day: number): boolean {
    return this.isOverflowMin(date, day) || this.isOverflowMax(date, day);
  }

  private isOverflowMin(date: Date, day: number): boolean {
    return this.minDate
      ? getDateWeight(changeDay(date, day)) < getDateWeight(this.minDate)
      : false;
  }

  private isOverflowMax(date: Date, day: number): boolean {
    return this.maxDate
      ? getDateWeight(changeDay(date, day)) > getDateWeight(this.maxDate)
      : false;
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
