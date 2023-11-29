import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { InputFieldComponent } from './input-field.component';

@NgModule({
  declarations: [InputFieldComponent],
  imports: [ReactiveFormsModule],
  exports: [InputFieldComponent]
})
export class InputFieldComponentModule {}
