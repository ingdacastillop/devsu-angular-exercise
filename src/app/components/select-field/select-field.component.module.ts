import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SelectFieldComponent } from './select-field.component';
import { IconComponentModule } from '../icon/icon.component.module';
import { BallotComponentModule } from '../ballot/ballot.component.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IconComponentModule,
    BallotComponentModule
  ],
  declarations: [SelectFieldComponent],
  exports: [SelectFieldComponent]
})
export class SelectFieldComponentModule {}
