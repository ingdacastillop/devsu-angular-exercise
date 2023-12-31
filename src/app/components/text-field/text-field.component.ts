import { Component, Input, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  InputFieldStatus,
  InputType
} from '../input-field/input-field.component';

const ERROR_MESSAGES: Record<string, string> = {
  required: 'Campo inválido',
  minlength: 'Campo no cumple con el mínimo de caracteres',
  maxlength: 'Campo excede caracteres permitidos'
};

@Component({
  selector: 'text-field',
  templateUrl: './text-field.component.html',
  styleUrls: ['./text-field.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TextFieldComponent {
  @Input()
  public inputControl: FormControl;

  @Input()
  public elementId?: string;

  @Input()
  public type: InputType = 'text';

  @Input()
  public placeholder = '';

  @Input()
  public disabled = false;

  protected status: InputFieldStatus;

  constructor() {
    this.status = {
      active: false,
      disabled: false,
      error: false
    };

    this.inputControl = new FormControl(null);
  }

  public onStatus(status: InputFieldStatus): void {
    this.status = status;
  }

  public get errorMessage(): string {
    if (this.inputControl.errors) {
      const [errorKey] = Object.keys(this.inputControl.errors);

      return ERROR_MESSAGES[errorKey] || '';
    }

    return '';
  }
}
