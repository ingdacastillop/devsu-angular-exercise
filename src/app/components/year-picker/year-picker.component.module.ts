import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { YearPickerComponent } from './year-picker.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  declarations: [YearPickerComponent],
  exports: [YearPickerComponent]
})
export class YearPickerComponentModule {}
