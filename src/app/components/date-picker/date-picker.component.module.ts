import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DayPickerComponentModule } from '../day-picker/day-picker.component.module';
import { MonthPickerComponentModule } from '../month-picker/month-picker.component.module';
import { YearPickerComponentModule } from '../year-picker/year-picker.component.module';
import { DatePickerComponent } from './date-picker.component';

@NgModule({
  declarations: [DatePickerComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DayPickerComponentModule,
    MonthPickerComponentModule,
    YearPickerComponentModule
  ],
  exports: [DatePickerComponent]
})
export class DatePickerComponentModule {}
