import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DayPickerComponent } from './day-picker.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  declarations: [DayPickerComponent],
  exports: [DayPickerComponent]
})
export class DayPickerComponentModule {}
