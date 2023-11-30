import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  forwardRef,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
  Output,
  ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import {
  changeDay,
  changeMonth,
  changeYear,
  getDateFormat,
  getDateWeight,
  MONTHS_NAME
} from '@xofttion/utils';
import { Subscription } from 'rxjs';
import {
  ModalOverlayComponent,
  OnModalOverlay
} from '../modal/modal.component.service';
import { DatePickerForm } from './date-picker.form';
import { DateListener, DateListenerType } from './date-utils';

type OverlayDatePicker = ModalOverlayComponent<DatePickerComponent>;

interface DatePickerStatus {
  disabled: boolean;
}

interface ComponentVisibility {
  day: boolean;
  month: boolean;
  year: boolean;
}

@Component({
  selector: 'date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(
        /* istanbul ignore next */
        () => DatePickerComponent
      ),
      multi: true
    }
  ]
})
export class DatePickerComponent
  implements
    OnInit,
    OnDestroy,
    AfterViewChecked,
    ControlValueAccessor,
    OnModalOverlay<DatePickerComponent>
{
  @Input()
  public enabled = true;

  @Input()
  public minDate?: Date;

  @Input()
  public maxDate?: Date;

  @Input()
  public automatic = false;

  @Output()
  public listener: EventEmitter<DateListener>;

  private overlay?: OverlayDatePicker;

  protected value: Date;

  protected date: DatePickerForm;

  protected subscriptions: Array<Subscription> = [];

  protected status: DatePickerStatus;

  protected visibility: ComponentVisibility;

  private onChange = (_?: Date): void => undefined;

  private onTouched = (_?: boolean): void => undefined;

  constructor(
    private changedDetectorRef: ChangeDetectorRef,
    private ngZone: NgZone
  ) {
    this.listener = new EventEmitter<DateListener>();

    this.value = new Date();

    this.date = new DatePickerForm(this.value);

    this.status = {
      disabled: false
    };

    this.visibility = {
      day: true,
      month: false,
      year: false
    };
  }

  public ngOnInit(): void {
    const yearSubscription = this.date.yearSubscribe(
      /* istanbul ignore next */
      (year) => {
        const newValue = changeYear(this.value, year);

        this.setValue(newValue);
        this.show('day');
      }
    );

    const monthSubscription = this.date.monthSubscribe(
      /* istanbul ignore next */
      (month) => {
        const newValue = changeMonth(this.value, month);

        this.setValue(newValue);
        this.show('day');
      }
    );

    const daySubscription = this.date.daySubscribe(
      /* istanbul ignore next */
      (day) => {
        const newValue = changeDay(this.value, day);

        this.setValue(newValue);

        if (this.automatic) {
          this.onChange(newValue);
          this.onTouched(true);
        }
      }
    );

    this.subscriptions.push(yearSubscription);
    this.subscriptions.push(monthSubscription);
    this.subscriptions.push(daySubscription);
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  /* istanbul ignore next */
  public ngAfterViewChecked(): void {
    this.changedDetectorRef.detectChanges();
  }

  /* istanbul ignore next */
  public ngOnOverlay(overlay: OverlayDatePicker): void {
    this.overlay = overlay;

    overlay.listener(({ key, value }) => {
      this.ngZone.run(() => {
        switch (key) {
          case 'mindate':
            this.minDate = value;
            break;
          case 'maxdate':
            this.maxDate = value;
            break;
        }
      });
    });
  }

  public get title(): string {
    return getDateFormat(this.value, 'dw, mx dd de aa');
  }

  public get year(): string {
    return this.value.getFullYear().toString();
  }

  public get month(): string {
    return MONTHS_NAME[this.value.getMonth()];
  }

  public onClickDay(): void {
    this.show('day');
  }

  public onClickMonth(): void {
    this.show('month');
  }

  public onClickYear(): void {
    this.show('year');
  }

  public onSelect(): void {
    this.onChange(this.value);
    this.onTouched(true);

    this.emitListener(DateListenerType.Select, this.value);
  }

  public onToday(): void {
    const value = new Date();

    this.onChange(value);
    this.onTouched(true);

    this.setValue(value);

    this.emitListener(DateListenerType.Today, value);
  }

  public onCancel(): void {
    this.emitListener(DateListenerType.Cancel);
  }

  private emitListener(name: DateListenerType, value?: Date): void {
    this.listener.emit({ name, value });

    this.overlay?.emit({ key: name, value });

    this.overlay?.close();
  }

  private show(key: string): void {
    Object.keys(this.visibility).forEach((keyComponent) => {
      (this.visibility as any)[keyComponent] = false;
    });

    (this.visibility as any)[key] = true;
  }

  private setValue(date?: Date): void {
    if (date) {
      this.isOverflow(date) ? this.recalculateValue(date) : (this.value = date);
    }
  }

  private recalculateValue(date: Date): void {
    this.value = this.isOverflowMin(date)
      ? (this.minDate as Date)
      : (this.maxDate as Date);

    this.onTouched(true);
    this.onChange(this.value);
  }

  private isOverflow(date: Date): boolean {
    return this.isOverflowMin(date) || this.isOverflowMax(date);
  }

  private isOverflowMin(date: Date): boolean {
    return this.minDate
      ? getDateWeight(date) < getDateWeight(this.minDate)
      : false;
  }

  private isOverflowMax(date: Date): boolean {
    return this.maxDate
      ? getDateWeight(date) > getDateWeight(this.maxDate)
      : false;
  }

  public writeValue(value?: Date): void {
    this.setValue(value);
  }

  public registerOnChange(onChange: (value?: Date) => void): void {
    this.onChange = onChange;
  }

  public registerOnTouched(onTouched: (value?: boolean) => void): void {
    this.onTouched = onTouched;
  }

  public setDisabledState(disabled: boolean): void {
    this.status.disabled = disabled;
  }
}
