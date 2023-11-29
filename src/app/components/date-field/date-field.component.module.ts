import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DatePickerComponentModule } from '../date-picker/date-picker.component.module';
import { IconComponentModule } from '../icon/icon.component.module';
import { ModalComponentModule } from '../modal/modal.component.module';
import { DateFieldComponent } from './date-field.component';

@NgModule({
  declarations: [DateFieldComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DatePickerComponentModule,
    ModalComponentModule,
    IconComponentModule
  ],
  exports: [DateFieldComponent]
})
export class DateFieldComponentModule {}
