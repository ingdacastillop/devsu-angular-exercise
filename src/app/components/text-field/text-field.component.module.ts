import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { InputFieldComponentModule } from '../input-field/input-field.component.module';
import { TextFieldComponent } from './text-field.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, InputFieldComponentModule],
  declarations: [TextFieldComponent],
  exports: [TextFieldComponent]
})
export class TextFieldComponentModule {}
