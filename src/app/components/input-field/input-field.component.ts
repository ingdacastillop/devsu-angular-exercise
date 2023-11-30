import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  Output,
  ViewEncapsulation
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
  ValidationErrors
} from '@angular/forms';

export type InputType = 'text' | 'number' | 'password' | 'email';

export interface InputFieldStatus {
  active: boolean;
  error: boolean;
  disabled: boolean;
}

@Component({
  selector: 'input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputFieldComponent),
      multi: true
    }
  ]
})
export class InputFieldComponent implements ControlValueAccessor {
  @Input()
  public elementId?: string;

  @Input()
  public formControl?: FormControl;

  @Input()
  public type: InputType = 'text';

  @Input()
  public placeholder = '';

  @Input()
  public readonly = false;

  @Output()
  public status: EventEmitter<InputFieldStatus>;

  protected statusField: InputFieldStatus;

  protected input = '';

  private onChange = (_?: string): void => undefined;

  private onTouch = (_: boolean): void => undefined;

  constructor() {
    this.statusField = {
      active: false,
      disabled: false,
      error: false
    };

    this.status = new EventEmitter();
  }

  public onFocus(): void {
    this.statusField.active = true;
    this.status.emit(this.statusField);
  }

  public onBlur(): void {
    this.statusField.active = false;
    this.status.emit(this.statusField);
    this.onTouch(true);
  }

  public onInput(event: Event): void {
    const { value } = event.target as HTMLInputElement;

    this.input = value;
    this.onChange(value);
  }

  private changeMsgError(errors: ValidationErrors): void {
    const [error] = Object.keys(errors).map((key) => errors[key]);

    let msgError = '';

    if (error) {
      msgError = error.message;
    }
  }

  public writeValue(value?: string): void {
    this.input = value || '';
  }

  public registerOnChange(onChange: (value?: string) => void): void {
    this.onChange = onChange;
  }

  public registerOnTouched(onTouch: (value: boolean) => void): void {
    this.onTouch = onTouch;
  }

  public setDisabledState(disabled: boolean): void {
    this.statusField.disabled = disabled;
    this.status.emit(this.statusField);
  }
}
