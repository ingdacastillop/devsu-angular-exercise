import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IconComponentModule } from '../icon/icon.component.module';
import { YearPickerComponent } from './year-picker.component';

@NgModule({
  declarations: [YearPickerComponent],
  imports: [CommonModule, ReactiveFormsModule, IconComponentModule],
  exports: [YearPickerComponent]
})
export class YearPickerComponentModule {}
