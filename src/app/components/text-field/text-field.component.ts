import { Component, Input, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  InputFieldStatus,
  InputType
} from '../input-field/input-field.component';

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
}
