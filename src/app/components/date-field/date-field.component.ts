import {
  Component,
  ElementRef,
  forwardRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Renderer2,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR
} from '@angular/forms';
import { getDateFormat, isDefined } from '@xofttion/utils';
import { DatePickerComponent } from '../date-picker/date-picker.component';
import {
  ModalComponentService,
  ModalOverlayComponent
} from '../modal/modal.component.service';

interface DateFieldStatus {
  active: boolean;
  disabled: boolean;
}

@Component({
  selector: 'date-field',
  templateUrl: './date-field.component.html',
  styleUrls: ['./date-field.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateFieldComponent),
      multi: true
    }
  ]
})
export class DateFieldComponent
  implements OnInit, OnDestroy, OnChanges, ControlValueAccessor
{
  @Input()
  public elementId?: string;

  @Input()
  public label = true;

  @Input()
  public enabled = true;

  @Input()
  public format = 'dd/mx/aa';

  @Input()
  public minDate?: Date;

  @Input()
  public maxDate?: Date;

  private modal?: ModalOverlayComponent<DatePickerComponent>;

  private dateControl: FormControl;

  public value?: Date;

  public description = '';

  public status: DateFieldStatus;

  private onChange = (_?: Date): void => undefined;

  private onTouched = (_?: boolean): void => undefined;

  constructor(
    private ref: ElementRef,
    private modalService: ModalComponentService
  ) {
    this.dateControl = new FormControl(new Date());

    this.status = {
      active: false,
      disabled: false
    };
  }

  /* istanbul ignore next */
  public ngOnInit(): void {
    this.ref.nativeElement.classList.add('input-field');
    this.ref.nativeElement.classList.add('date-field');

    this.modal = this.modalService.build(DatePickerComponent);

    this.setValue(this.dateControl.value);

    this.modal.susbcribe(({ value }) => {
      if (value) {
        this.approvedValue(value);
      }
    });

    this.modal?.send({ key: 'mindate', value: this.minDate });
    this.modal?.send({ key: 'maxdate', value: this.maxDate });
  }

  public ngOnDestroy(): void {
    this.modal?.destroy();
  }

  /* istanbul ignore next */
  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['minDate']) {
      this.modal?.send({
        key: 'mindate',
        value: changes['minDate'].currentValue
      });
    }

    if (changes['maxDate']) {
      this.modal?.send({
        key: 'maxdate',
        value: changes['maxDate'].currentValue
      });
    }
  }

  public get isDisabled(): boolean {
    return !this.enabled || this.status.disabled;
  }

  public get iconAction(): string {
    return this.value ? 'trash-2' : 'calendar';
  }

  /* istanbul ignore next */
  public onClickInput(): void {
    if (!this.isDisabled) {
      this.modal?.open();
    }
  }

  public onFocus(): void {
    this.status.active = true;
  }

  public onBlur(): void {
    this.status.active = false;
  }

  /* istanbul ignore next */
  public onKeydownInput(event: KeyboardEvent): void {
    if (!this.isDisabled) {
      switch (event.code) {
        case 'Space':
          this.modal?.open();
          break;

        case 'Enter':
          this.modal?.open();
          break;
      }
    }
  }

  /* istanbul ignore next */
  public onClickAction() {
    if (!this.isDisabled) {
      this.value ? this.approvedValue() : this.modal?.open();
    }
  }

  private approvedValue(value?: Date): void {
    this.setValue(value);

    this.onTouched(true);
    this.onChange(value);
  }

  private setValue(value?: Date): void {
    this.value = value;

    this.description = value ? getDateFormat(value, this.format) : '';
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
