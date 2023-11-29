import {
  Component,
  ElementRef,
  forwardRef,
  Input,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewEncapsulation
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR
} from '@angular/forms';
import { getDateFormat } from '@xofttion/utils';
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
  implements OnInit, OnDestroy, ControlValueAccessor
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

  @Input()
  public xftTheme = 'none';

  private modal?: ModalOverlayComponent<DatePickerComponent>;

  private dateControl: FormControl;

  public value?: Date;

  public description = '';

  public status: DateFieldStatus;

  private onChange = (_?: Date): void => undefined;

  private onTouch = (_?: Date): void => undefined;

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

  public ngOnInit(): void {
    console.log(this.ref)
    this.ref.nativeElement.classList.add('input-field');
    this.ref.nativeElement.classList.add('date-field');

    this.modal = this.modalService.build(DatePickerComponent);

    this.setValue(this.dateControl.value);

    this.modal.children.setTheme(this.xftTheme);

    this.modal.addListener(({ value }) => {
      if (value) {
        this.approvedValue(value);
      }
    });
  }

  public ngOnDestroy(): void {
    this.modal?.destroy();
  }

  public get iconAction(): string {
    return this.value ? 'trash-2' : 'calendar';
  }

  public onClickInput(): void {
    this.modal?.open();
  }

  public onFocus(): void {
    this.status.active = true;
  }

  public onBlur(): void {
    this.status.active = false;
  }

  public onKeydownInput(event: KeyboardEvent): void {
    switch (event.code) {
      case 'Space':
        this.modal?.open();
        break;

      case 'Enter':
        this.modal?.open();
        break;
    }
  }

  public onClickAction() {
    this.value ? this.approvedValue() : this.modal?.open();
  }

  private approvedValue(value?: Date): void {
    this.setValue(value);

    this.onTouch(value);
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

  public registerOnTouched(onTouch: (value?: Date) => void): void {
    this.onTouch = onTouch;
  }

  public setDisabledState(disabled: boolean): void {
    this.status.disabled = disabled;
  }
}
