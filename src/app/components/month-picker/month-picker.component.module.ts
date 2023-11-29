import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MonthPickerComponent } from './month-picker.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  declarations: [MonthPickerComponent],
  exports: [MonthPickerComponent]
})
export class MonthPickerComponentModule {}
